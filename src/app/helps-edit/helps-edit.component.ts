import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpService, CategoryService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Help, HelpCategory } from '@app/_models';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-helps-edit',
  templateUrl: './helps-edit.component.html',
  styleUrls: ['./helps-edit.component.css']
})
export class HelpsEditComponent implements OnInit {
   @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;
  public idCat1 = null;
  public idCat2 = null;
  public idCat3 = null;

  categories: HelpCategory[] = [];
  helpsForm: FormGroup;
  id: number = null;
  submitted = false;
  model: Help = null;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
    private cloudinary: Cloudinary,
    private cs: CategoryService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private hs: HelpService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    const id = this.activeRouter.snapshot.params.id;
    this.hs.getById(id).subscribe(x => {
      this.model = x;
      console.log(this.model.category);

      if (x.category.parent.parent !== undefined && x.category.parent.parent !== null ) {
        this.idCat3 = x.idCategory;
        this.idCat2 = x.category.parent.id;
        this.idCat1 = x.category.parent.parent.id;
      } else if (x.category.parent !== undefined && x.category.parent !== null) {
        this.idCat2 = x.idCategory;
        this.idCat1 = x.category.parent.id;
      } else {
        this.idCat1 = x.idCategory;
      }
      this.setCurrentLocation();
      this.responses = [];
    });
    this.cs.getAll().subscribe(x => {
      this.categories = x;
    });
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder();

      setTimeout(() => {

        const autocomplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement, {
            types: ['address']
          }
        );

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            this.model.latitude = place.geometry.location.lat();
            this.model.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      }, 500);

    });

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', 'preset_help');
      console.log(this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      const tags = 'myphotoalbum';
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default 'withCredentials' value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {
      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.ngZone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response)
      });

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse({
        file: fileItem.file,
        progress,
        data: {}
      });
  }

  // Delete an uploaded image
  // Requires setting 'Return delete token' to 'Yes' in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function(data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/delete_by_token`;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    const options = { headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties).map(key => ({
      key,
      value: fileProperties[key]
    }));
  }

  // Get current location coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      if (this.model.latitude != null && this.model.longitude != null) {
        navigator.geolocation.getCurrentPosition(position => {
          this.zoom = 8;
          this.getAddress(this.model.latitude, this.model.longitude);
        });
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.model.latitude = position.coords.latitude;
          this.model.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.model.latitude, this.model.longitude);
        });
      }
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.model.latitude = $event.coords.lat;
    this.model.longitude = $event.coords.lng;
    this.getAddress(this.model.latitude, this.model.longitude);
  }

  getAddress(latitude, longitude) {
    if (this.geoCoder) {
      this.geoCoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.zoom = 12;
              this.model.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        }
      );
    }
  }

  onSubmit() {
    this.submitted = true;

    // image
    const image = this.responses[0];
    if (image != null) {
      this.model.image = image.data.public_id;
    }

    // category
    this.model.idCategory = this.idCat3 != null ? this.idCat3 : this.idCat2;

    this.hs.updateHelp(this.model).subscribe(
      () => {
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
