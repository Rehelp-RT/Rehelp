import { Component, ViewChild, ElementRef, Input, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService, CategoryService, HelpService, ResponseService, UserService, TypeService } from '@app/services';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HelpCategory, Help, User, HelpResponse, HelpType } from '@app/models';
import { LoadingService } from '@app/shared/services/loading.service';

@Component({
    selector: 'app-helps-ask',
    templateUrl: './helps-ask.component.html',
    styleUrls: ['./helps-ask.component.scss'],
    standalone: false
})
export class HelpsAskComponent implements OnInit, AfterViewInit {
  @Input()
  responses: Array<any> = [];

  model: Help = null;
  type: HelpType = null;
  submitted = false;
  currentUser: User;
  userToAsk: User;
  // response
  response: HelpResponse;

  // category
  categories: HelpCategory[] = [];
  public idCat = null;

  // image
  public imageUploaded = false;
  public uploading = false;

  // map
  zoom: number;
  address: string;
  lastAddress: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  object: { [key: number]: string } = { 2: 'foo', 1: 'bar' };
  map = new Map([[2, 'foo'], [1, 'bar']]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cs: CategoryService,
    private hs: HelpService,
    private as: AuthenticationService,
    private ts: TypeService,
    private ngZone: NgZone,
    private location: Location,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private responseService: ResponseService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    const codeType =
      this.activeRoute.snapshot.queryParamMap.get('type')
        ? this.activeRoute.snapshot.queryParamMap.get('type')
        : 'MEH';
    console.log('codeType', codeType);

    this.currentUser = this.as.currentUserValue;
    this.model = new Help();
    this.model.idCreator = this.currentUser.id;
    this.model.idType = 1;
    this.model.isOffer = true;
    this.model.latitude = this.currentUser.latitude;
    this.model.longitude = this.currentUser.longitude;
    this.zoom = 12;

    // get type
    this.initTypes(codeType);

  }

  ngAfterViewInit() {
    this.initMaps();
  }

  toggleImgUploader() {
    this.imageUploaded = !this.imageUploaded;
  }

  // Delete an uploaded image
  // Requires setting 'Return delete token' to 'Yes' in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/delete_by_token`;
    console.log(url, 'url');
    const headers = [{
      name: 'X-Requested-With',
      value: 'XMLHttpRequest'
    }];
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

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload_preset', environment.cloudinaryHelpPreset);
    formData.append('folder', 'angular_sample');
    formData.append('tags', 'myphotoalbum');
    formData.append('file', file);
    this.uploading = true;
    this.loadingService.show();
    this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/upload`, formData).subscribe(
      (response: any) => {
        this.uploading = false;
        this.loadingService.hide();
        this.imageUploaded = true;
        this.responses.push({ file: { name: file.name }, status: 200, data: response });
      },
      err => { this.uploading = false; this.loadingService.hide(); console.error(err); }
    );
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

  markerDragEnd(event: google.maps.MapMouseEvent) {
    this.model.latitude = event.latLng.lat();
    this.model.longitude = event.latLng.lng();
    this.getAddress(this.model.latitude, this.model.longitude);
  }

  getAddress(latitude, longitude) {
    if (this.geoCoder) {
      this.geoCoder.geocode({
          location: { lat: latitude, lng: longitude }
        },
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
        });
    }
  }

  initTypes(type) {
    this.ts.getByCode(type).subscribe(x => {
      this.type = x;
      console.log('type', this.type)
      this.model.idType = x.id;

      if (this.type.code == 'IMH') {
        this.model.halfhourValidity = 1;
      }
      const id = this.activeRoute.snapshot.params.id;
      this.userService.getById(id).subscribe(y => {
        this.userToAsk = y;
        console.log('this.type.code',this.type.code)
        this.userService.getCategories(this.userToAsk.id, x.id).subscribe(y => {
          if (y.categories && y.categories.length > 0) {
            this.categories = y.categories;
          } else {
            this.cs.getAll(x.id).subscribe(cats => {
              this.categories = cats;
            });
          }
        });
      });
    });
  }

  initMaps() {
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
        this.getAddress(this.model.latitude, this.model.longitude);
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    // image
    const i = this.responses.length - 1;
    const image = this.responses[i];
    this.model.image = image === undefined ? null : image.data.public_id;

    this.model.address = this.lastAddress;
    // category
    this.model.idCategory = this.idCat;

    this.addHelp();
  }

  addHelp() {
    // crea l'help
    this.hs.addHelp(this.model).subscribe(x => {
        this.response = new HelpResponse();
        this.response.responder = this.userToAsk;
        this.response.idResponder = this.userToAsk.id;
        this.response.help = x;
        this.response.idHelp = x.id;

        this.addResponse();
      },
      err => {
        console.log('errore addHelp', err);
      });
  }

  addResponse() {
    // crea la risposta
    this.responseService.addResponse(this.response).subscribe(
      res => {
        this.router.navigate(['/helps/', this.response.help.id]);
        this.acceptResponse();
      },
      err => {
        console.log('errore addResponse', err);
      }
    );
  }

  acceptResponse() {
    // accetta la risposta
    this.responseService.acceptResponse(this.response).subscribe(x => {
        this.router.navigate(['/helps/', this.response.help.id]);
      },
      err => {
        console.log('errore acceptResponse', err);
      });
  }

  getCategoryFullname(cat: HelpCategory): string {
    let result = '';
    if (cat.parent) {
      if (cat.parent.parent) {
        result += cat.parent.parent.name + ' / ';
      }
      result += cat.parent.name + ' / ';
    }
    result += cat.name;
    return result;
  }

  back() {
    this.location.back();
  }

}
