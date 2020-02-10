import {
  Component,
  ViewChild,
  ElementRef,
  NgZone,
  OnInit
} from '@angular/core';
import {
  AuthenticationService,
  CategoryService,
  HelpService
} from '@app/_services';
import { Router } from '@angular/router';
import { HelpCategory, Help, User } from '@app/_models';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent implements OnInit {
  categories: HelpCategory[] = [];
  model: Help = null;
  submitted = false;
  currentUser: User;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
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
        });
      });
    });
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
    console.log(this.model);
    // this.hs.addHelp(this.model).subscribe(
    //   res => {
    //     this.router.navigate(['/helps']);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }


  // addHelps() {
  //   const payload = {
  //     title: this.helpsForm.controls.title.value,
  //   };
  // this.hs.addHelps(payload)
  //   .subscribe(res => {
  //       let id = res['_id'];
  //       this.router.navigate(['/helps']);
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
}
