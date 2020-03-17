import { Component, ViewChild, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService, CategoryService, HelpService } from '@app/services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HelpCategory, Help, User } from '@app/models';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent implements OnInit {
  @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;

  categories: HelpCategory[] = [];
  model: Help = null;
  submitted = false;
  currentUser: User;
  zoom: number;
  address: string;
  lastAddress: string;
  private geoCoder;

  public idCat1 = null;
  public idCat2 = null;
  public idCat3 = null;
  public imageUploaded = false;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  object: {[key: number]: string} = {2: 'foo', 1: 'bar'};
  map = new Map([[2, 'foo'], [1, 'bar']]);

  constructor(
      private location: Location,
      private cloudinary: Cloudinary,
      private http: HttpClient,
      private cs: CategoryService,
      private router: Router,
      private hs: HelpService,
      private as: AuthenticationService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
  ) {
    this.as.currentUser.subscribe(x => {
      this.currentUser = x;
      this.model = new Help();
      this.model.idCreator = this.currentUser.id;
      this.model.idType = 1;
      this.responses = [];
    });
    this.cs.getAll().subscribe(x => {
      this.categories = x;
    });
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
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
          this.getAddress(this.model.latitude,this.model.longitude);
        });
      });
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
        this.imageUploaded = true;
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

  toggleImgUploader() {
    this.imageUploaded = !this.imageUploaded;
  }

  // Delete an uploaded image
  // Requires setting 'Return delete token' to 'Yes' in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function(data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/delete_by_token`;
    console.log(url, 'url');
    const headers = [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }
    ];
    const options = { headers };
    console.log(data, 'data');
    const body = {
      token: data.delete_token
    };
    console.log(body, 'body');
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
    this.imageUploaded = !this.imageUploaded;
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
      navigator.geolocation.getCurrentPosition(position => {
        this.model.latitude = position.coords.latitude;
        this.model.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.model.latitude, this.model.longitude);
      });
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
              this.lastAddress = results[0].formatted_address;
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
    const i = this.responses.length - 1;
    // image
    const image = this.responses[i];
    this.model.image = image === undefined ? null : image.data.public_id;

    this.model.address = this.lastAddress;
    // category
    this.model.idCategory = this.idCat3 != null ? this.idCat3 : this.idCat2;

    this.hs.addHelp(this.model).subscribe(
      () => {
        this.router.navigate(['/profile' ]);
      },
      err => {
        console.log(err);
      }
    );
  }

    back() {
        this.location.back();
    }

}
