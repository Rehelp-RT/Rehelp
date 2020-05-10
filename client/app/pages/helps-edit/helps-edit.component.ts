import { Component, ViewChild, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, CategoryService, HelpService, TypeService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

// model
import { Help, HelpCategory, User, HelpType } from '@app/models';

// image
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

// maps
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-helps-edit',
  templateUrl: './helps-edit.component.html',
  styleUrls: ['./helps-edit.component.scss']
})
export class HelpsEditComponent implements OnInit {
  @Input()
  responses: Array<any> = [];

  // model
  submitted = false;
  helpsForm: FormGroup;
  idHelp: number = null;
  type: HelpType = null;
  model: Help = null;
  currentUser: User;

  // categories
  categories: HelpCategory[] = [];
  public idCat1 = null;
  public idCat2 = null;
  public idCat3 = null;
  public imageUploaded = false;

  // image
  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;

  // maps
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private as: AuthenticationService,
    private cs: CategoryService,
    private hs: HelpService,
    private ts: TypeService,
    private cloudinary: Cloudinary,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
    // get params
    if (this.activeRoute.snapshot.params.id) {
      this.idHelp = this.activeRoute.snapshot.params.id;
    }
    const type =
      this.activeRoute.snapshot.params.type
      ? this.activeRoute.snapshot.params.type
      : 'MEH';

    console.log('idHelp', this.idHelp);
    console.log('type', type);

    if (this.idHelp) {
      // edit
      this.initEditHelp();
    } else {
      // create
      this.initCreateHelp(type);
    }

    // images
    this.initImages();
  }

  // convenience getter for easy access to form fields
  get f() { return this.helpsForm.controls; }

  private initForm() {
    this.helpsForm = this.formBuilder.group({
      title: [this.model.title, Validators.required],
      description: [this.model.description, Validators.required]
    });
  }

  private initEditHelp() {
    this.hs.getById(this.idHelp).subscribe(x => {
      // model
      this.model = x;
      this.type = x.type;

      // form validation
      this.initForm();

      // categories
      this.initCategories(this.model.idType);

      // responses
      this.responses = [];

      // maps
      this.initMaps();
    });
  }

  private initCreateHelp(type: string) {
    this.as.currentUser.subscribe(x => {
      // help
      this.model = new Help();

      // current user
      this.currentUser = x;
      this.model.idCreator = this.currentUser.id;
      this.model.title = '';
      this.model.description = '';

      // get type
      this.ts.getByCode(type).subscribe(x => {
        this.type = x;
        this.model.idType = x.id;

        if (this.type.code == 'IMH') {
          this.model.halfhourValidity = 1;
        }
        // categories
        this.initCategories(x.id);
        
      });

        // form validation
        this.initForm();

      // maps
      this.initMaps();
    });
  }

  private initCategories(idType: number) {
    // categories
    this.cs.getAll(idType).subscribe(x => {
      this.categories = x;

      if (this.model.category) {
        if (this.model.category.parent !== undefined && this.model.category.parent !== null) {
          if (this.model.category.parent.parent !== undefined && this.model.category.parent.parent !== null) {
            this.idCat3 = this.model.idCategory;
            this.idCat2 = this.model.category.parent.id;
            this.idCat1 = this.model.category.parent.parent.id;
          } else {
            this.idCat2 = this.model.idCategory;
            this.idCat1 = this.model.category.parent.id;
          }
        } else {
          this.idCat1 = this.model.idCategory;
        }
      }
    });
  }

  private initMaps() {
    this.setCurrentLocation();
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
            this.getAddress(this.model.latitude, this.model.longitude);
          });
        });
      }, 500);

    });
  }

  private initImages() {

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

  deleteImage = function(data: any, index: number) {
    // Delete an uploaded image
    // Requires setting 'Return delete token' to 'Yes' in your upload preset configuration
    // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
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
      if (this.idHelp && this.model.latitude != null && this.model.longitude != null) {
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

  getTimeEndValidity() {
    const expiredDate = moment(new Date()).add(this.model.halfhourValidity*30, 'm').toDate();
    return expiredDate;
  }

  getDayEndValidity() {
    const today = new Date();
    const expiredDate = moment(today).add(this.model.halfhourValidity*30, 'm').toDate();

    return (today.getDay() === expiredDate.getDay() ? '' : 'domani');
  }

  getTimespan() {
    const hours = this.model.halfhourValidity ? Math.floor(this.model.halfhourValidity*0.5) : 0;
    const half = (this.model.halfhourValidity % 2) == 0 ? '00' : '30';
    return hours + ':' + half;
  }

  onSubmit() {
    this.submitted = true;

    if (this.helpsForm.invalid) {
      // form is invalid
      return;
    } else {
      // get forms value
      this.model.title = this.f.title.value;
      this.model.description = this.f.description.value;

      // image
      const i = this.responses.length - 1;
      const image = this.responses[i];
      if (image != null) {
        this.model.image = image.data.public_id;
      }

      // category
      this.model.idCategory = this.idCat3 != null ? this.idCat3 : (this.idCat2 != null ? this.idCat2 : this.idCat1);

      if (this.idHelp) {
        // update help
        this.updateHelp();
      } else {
        // create help
        this.createHelp();
      }
    }
  }

  private createHelp() {
    this.hs.addHelp(this.model).subscribe(x => {
      this.router.navigate(['/helps/', x.id]);
    },
    err => {
      console.log(err);
    });
  }

  private updateHelp() {
    this.hs.updateHelp(this.model).subscribe(() => {
      this.router.navigate(['/helps/', this.model.id]);
    },
    err => {
      console.log(err);
    });
  }
}
