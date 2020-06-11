import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    NgZone,
} from '@angular/core';
import { User, HelpCategory, HelpType } from '@app/models';
import {
    UserService,
    AuthenticationService,
    CategoryService,
    TypeService,
    DistanceService,
} from '@app/services';
import { ActivatedRoute } from '@angular/router';

// maps
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    type: HelpType;
    users: User[] = [];
    defaultDistance: Number[] = [10, 20, 50, 100];
    public selectedDistance = null;
    currentUser: User = null;

    lat: Number = null;
    long: Number = null;

    // category
    categories: HelpCategory[] = [];
    public idCat1 = null;
    public idCat2 = null;
    public idCat3 = null;

    // maps
    zoom: number;
    address: string;
    private geoCoder;
    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private as: AuthenticationService,
        private cs: CategoryService,
        private ds: DistanceService,
        private ts: TypeService,
        private us: UserService,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader
    ) {}

    ngOnInit() {
        this.as.getCurrentUser().subscribe((x) => {
            this.currentUser = x;
        });

        this.lat = this.currentUser.latitude;
        this.long = this.currentUser.longitude;

        const codeType = this.activeRoute.snapshot.queryParamMap.get('type')
            ? this.activeRoute.snapshot.queryParamMap.get('type')
            : 'MEH';
        this.ts.getByCode(codeType).subscribe((type) => {
            this.type = type;
        });

        this.cs.getAll().subscribe((cats) => {
            this.categories = cats;
        });

        this.us.getAll(this.currentUser.id).subscribe(users => {
            this.users = users;
        });

        // maps
        this.initMaps();
    }

    getDistance(latitude: number, longitude: number) {
        const distance = this.ds.calcCrow(latitude, longitude, this.currentUser.latitude, this.currentUser.longitude);
        if (distance < 1) {
            return (distance * 1000).toFixed(0) + ' metri';
        } else {
            return distance.toFixed(1).replace('.', ',') + ' km';
        }
    }

    filter() {
      var cat = this.idCat2 != null ? this.idCat2 : this.idCat1;
      this.us
        .getAll(
          this.currentUser.id,
          cat,
          this.selectedDistance,
          this.lat,
          this.long
        )
        .subscribe((x) => {
          this.users = x;
        });
    }

    private initMaps() {
      this.setCurrentLocation();
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder();
      });
    }

    // Get current location coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        if (this.currentUser.latitude != null && this.currentUser.longitude != null) {
          navigator.geolocation.getCurrentPosition(position => {
            this.zoom = 8;
            this.getAddress(this.currentUser.latitude, this.currentUser.longitude);
          });
        } else {
          navigator.geolocation.getCurrentPosition(position => {
            this.currentUser.latitude = position.coords.latitude;
            this.currentUser.longitude = position.coords.longitude;
            this.zoom = 8;
            this.getAddress(this.currentUser.latitude, this.currentUser.longitude);
          });
        }
      }
    }

    getAddress(latitude, longitude) {
      if (this.geoCoder) {
        this.geoCoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                this.zoom = 12;
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
}
