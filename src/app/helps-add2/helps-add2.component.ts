import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';

import { AuthenticationService, CategoryService, HelpService } from '@app/_services';
import { HelpCategory, Help, User } from '@app/_models';
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-helps-add2',
  templateUrl: './helps-add2.component.html',
  styleUrls: ['./helps-add2.component.css']
})
export class HelpsAdd2Component implements OnInit {
  categories: HelpCategory[] = [];
  model: Help = null;
  submitted = false;
  currentUser: User;

  geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap, {static: true}) map: AgmMap;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  constructor(private cs: CategoryService,
              private hs: HelpService,
              private as: AuthenticationService,
              public mapsApiLoader: MapsAPILoader,
              private zone: NgZone) {

        this.mapsApiLoader = mapsApiLoader;
        this.zone = zone;
        this.mapsApiLoader.load().then(() => {
          this.geocoder = new google.maps.Geocoder();
        });

        this.as.currentUser.subscribe(x => {
          console.log('user ==>');
          console.log(x);
          this.currentUser = x;
          this.model = new Help();
          this.model.idCreator = this.currentUser.id;
          this.model.idType = 1;
          console.log('model ==>');
          console.log(this.model);
        });

        this.cs.getAll().subscribe(x => {
          this.categories = x;
        });
  }

  ngOnInit() {
    this.location.marker.draggable = true;
  }

  onSubmit() {
    let full_address: string = this.location.address_level_1 || '';
    if (this.location.address_level_2) {
      full_address = full_address + ' ' + this.location.address_level_2
    }
    if (this.location.address_state) {
      full_address = full_address + ' ' + this.location.address_state
    }
    if (this.location.address_country) {
      full_address = full_address + ' ' + this.location.address_country
    }

    this.findLocation(full_address);
    /*
    this.submitted = true;
    this.hs.addHelp(this.model).subscribe(
      res => {
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );*/
  }

  findLocation(address) {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    this.geocoder.geocode({
      address: address
    }, (results, status) => {
      console.log(results);
      if (status === google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert('Sorry, this search produced no results.');
      }
    });
  }

  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
   }

   findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for(let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
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
