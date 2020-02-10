import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpService, CategoryService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Help, HelpCategory } from '@app/_models';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-helps-edit',
  templateUrl: './helps-edit.component.html',
  styleUrls: ['./helps-edit.component.css']
})
export class HelpsEditComponent implements OnInit {
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
    private cs: CategoryService,
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private hs: HelpService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    const id = this.activeRouter.snapshot.params.id;
    this.hs.getById(id).subscribe(x => {
      this.model = x;
      this.model.title = x.title;
      this.model.idCategory = x.idCategory;
      this.model.description = x.description;
      this.model.latitude = x.latitude;
      this.model.longitude = x.longitude;
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
    console.log(this.model, 'model');
    this.hs.updateHelp(this.model).subscribe(
      res => {
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
