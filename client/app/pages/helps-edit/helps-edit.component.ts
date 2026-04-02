import { Component, ViewChild, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, CategoryService, HelpService, TypeService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

// model
import { Help, HelpCategory, User, HelpType, Association } from '@app/models';

import { range } from 'rxjs';
import { AssociationService } from '@app/services/association.service';

@Component({
    selector: 'app-helps-edit',
    templateUrl: './helps-edit.component.html',
    styleUrls: ['./helps-edit.component.scss'],
    standalone: false
})
export class HelpsEditComponent implements OnInit {
    @Input()
    responses: Array<any> = [];

    // model
    submitted = false;
    helpsForm: UntypedFormGroup;
    idHelp: number = null;
    type: HelpType = null;
    model: Help = null;
    currentUser: User;
    arrayLhToDonate: Array<any> = [];
    arrayLh: Array<any> = [];
    associations: Association[] = [];

    // categories
    categories: HelpCategory[] = [];
    public cat1Id: number = null;
    public cat2Id: number = null;
    public cat3Id: number = null;
    public catImg: string = null;
    public donateTo: string = null;
    public lhToDonate: string = null;
    public likehelps: string = null;

    // image
    public imageUploaded = false;
    public uploading = false;

    // maps
    zoom: number;
    address: string;
    private geoCoder;
    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private as: AuthenticationService,
        private cs: CategoryService,
        private hs: HelpService,
        private ts: TypeService,
        private ass: AssociationService,
        private http: HttpClient,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            console.log('params', params);
            this.getCurrentUser();
            this.getAssociations();
            if (params.id) {
                // edit
                this.idHelp = params.id
                this.initEditHelp();
            } else {
                // create
                const type =
                    this.activeRoute.snapshot.params.type
                    ? this.activeRoute.snapshot.params.type
                    : 'MEH';
                this.initCreateHelp(type);
            }
            console.log(this.currentUser.likehelps)
            for(let i = 1; i <= this.currentUser.likehelps; i++) {
                this.arrayLh.push(i);
            }
        });
    }

    getCurrentUser(): void {
        this.as.getCurrentUser().subscribe(x => {
            this.currentUser = x;
        });
    }

    getAssociations(): void {
        this.ass.getAssociations().subscribe(x => {
            this.associations = x;
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.helpsForm.controls; }

    private initForm() {
        this.helpsForm = this.formBuilder.group({
          description: [this.model.description, Validators.required]
        });
    }

    private initEditHelp() {
        this.hs.getById(this.idHelp).subscribe(x => {
            if (x.idCreator == this.as.currentUserValue.id) {
                // can edit
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
            } else {
                // can't edit
                this.router.navigate(['/helps/' + this.idHelp]);
            }
        });
    }

    private initCreateHelp(type: string) {
        // help
        this.model = new Help();
        this.model.idCreator = this.as.currentUserValue.id;
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
    }

    private initCategories(idType: number) {
        // categories
        this.cs.getAll(idType).subscribe(x => {
            this.categories = x;

            if (this.model.category) {
                if (this.model.category.parent !== undefined && this.model.category.parent !== null) {
                    if (this.model.category.parent.parent !== undefined && this.model.category.parent.parent !== null) {
                        this.cat3Id = this.model.category.id;
                        this.cat2Id = this.model.category.parent.id;
                        this.cat1Id = this.model.category.parent.parent.id;
                        this.catImg = this.model.category.image;
                    } else {
                        this.cat2Id = this.model.category.id;
                        this.cat1Id = this.model.category.parent.id;
                        this.catImg = this.model.category.image;
                    }
                } else {
                    this.cat1Id = this.model.category.id;
                    this.catImg = this.model.category.image;
                }
                console.log('cat')
            }
        });
    }

    private initMaps() {
      this.setCurrentLocation();
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
    }

    onFileSelected(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('upload_preset', 'preset_help');
      formData.append('folder', 'angular_sample');
      formData.append('tags', 'myphotoalbum');
      formData.append('file', file);
      this.uploading = true;
      this.http.post('https://api.cloudinary.com/v1_1/hwbyvepex/upload', formData).subscribe(
        (response: any) => {
          this.uploading = false;
          this.imageUploaded = true;
          this.responses.push({ file: { name: file.name }, status: 200, data: response });
        },
        err => { this.uploading = false; console.error(err); }
      );
    }

    toggleImgUploader() {
        this.imageUploaded = !this.imageUploaded;
    }

    deleteImage = function(data: any, index: number) {
        const url = `https://api.cloudinary.com/v1_1/hwbyvepex/delete_by_token`;
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

    markerDragEnd(event: google.maps.MapMouseEvent) {
        this.model.latitude = event.latLng.lat();
        this.model.longitude = event.latLng.lng();
        this.getAddress(this.model.latitude, this.model.longitude);
    }

    getAddress(latitude, longitude) {
        if (this.geoCoder) {
            this.geoCoder.geocode({
                location: {
                    lat: latitude,
                    lng: longitude
                }
            },
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
            });
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

    getCategoryImage() {
        if (this.model.image) {
            return 'https://res.cloudinary.com/hwbyvepex/image/upload/v1582196512/' + this.model.image;
        } else if (this.cat1Id || this.cat2Id || this.cat3Id) {
            const catId = this.cat3Id ? this.cat3Id : (this.cat2Id ? this.cat2Id : this.cat1Id);
            const catLevel = this.cat3Id ? 3 : (this.cat2Id ? 2 : 1);
            var cat: HelpCategory;

            this.categories.find(c1 => {
                    if (catLevel == 1) {
                        if (c1.id == catId) {
                            cat = c1;
                            return;
                        }
                    } else if (c1.children.length > 0) {
                        c1.children.find(c2 => {
                            if (catLevel == 2) {
                                if (c2.id == catId) {
                                    cat = c2;
                                    return;
                                }
                            } else if (c2.children.length > 0) {
                                var cat3 = c2.children.find(c3 => {
                                    if (c3.id == catId) {
                                        cat = c3;
                                        return;
                                    }
                                });
                                if (cat) {
                                    return;
                                }
                            }
                            if (cat) {
                                return;
                            }
                        });
                    }
                    if (cat) {
                        return;
                    }
                });
            return 'assets/img/categories/' + cat.image;
        } else {
            return 'assets/img/placeholder-help.png';
        }
    }

    onSubmit() {
        this.submitted = true;

        if (this.helpsForm.invalid) {
            // form is invalid
            return;
        } else {
            // get forms value
            this.model.description = this.f.description.value;
            this.model.likehelps = parseInt(this.likehelps);
            this.model.lhToDonate = parseInt(this.lhToDonate);
            this.model.idDonateTo = parseInt(this.donateTo);

            // image
            const i = this.responses.length - 1;
            const image = this.responses[i];
            if (image != null) {
                this.model.image = image.data.public_id;
            }

            // category
            this.model.idCategory = this.cat3Id ? this.cat3Id : (this.cat2Id ? this.cat2Id : this.cat1Id);

            if (this.idHelp) {
                // update help
                this.updateHelp();
            } else {
                // create help
                this.createHelp();
            }
        }
    }

    createArray() {
            for(let i = 1; i <= parseInt(this.likehelps); i++) {
                this.arrayLhToDonate.push(i);
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
