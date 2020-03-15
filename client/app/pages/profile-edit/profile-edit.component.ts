import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { User } from '@app/models';
import { UserService, AuthenticationService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';

// maps
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  // model
  model: User = null;
  submitted = false;

  // maps
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private as: AuthenticationService,
    private us: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    const id = this.activeRouter.snapshot.params.id;
    this.us.getById(id).subscribe(x => {
      // model
      this.model = x;

      // maps
      this.initMaps();
    });
  }

  initMaps() {
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
            } else {
              this.setPlace(place);
            }
          });
        });
      }, 500);

    });
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
              this.setPlace(results[0]);
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

  setPlace(place) {
    // iterate through address_component array
    place.address_components.forEach((x: google.maps.GeocoderAddressComponent) => {
        if (x.types[0] === 'country') {
            console.log('country', x.long_name);
            this.model.country = x.long_name;
        } else if (x.types[0] === 'administrative_area_level_3') {
            console.log('city', x.long_name);
            this.model.city = x.long_name;
        }
    });

    // set address
    this.address = place.formatted_address;
    console.log('address', this.address);

    // set latitude, longitude and zoom
    this.model.latitude = place.geometry.location.lat();
    this.model.longitude = place.geometry.location.lng();
    console.log('latitude', this.model.latitude);
    console.log('longitude', this.model.longitude);
    this.zoom = 12;
  }

  onSubmit() {
    this.submitted = true;
    this.us.update(this.model).subscribe(
      res => {
        this.as.refresh(this.model);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
