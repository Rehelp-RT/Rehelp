import { HttpClient } from '@angular/common/http';
import { AuthenticationService, BachecaService, CategoryService, HelpService, ResponseService, TypeService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

// model
import { HelpCategory, User, HelpType, Association } from '@app/models';
import { BachecaPost } from '@app/models/bachecaPost';
import { CheckoutService } from '@app/services/checkout.service';

@Component({
    selector: 'app-bacheca-form',
    templateUrl: './bacheca-form.component.html',
    styleUrls: ['./bacheca-form.component.css'],
    standalone: false
})
export class BachecaFormComponent implements OnInit {
  @Input()
  responses: Array<any> = [];
  @Input() likehelps: number;
  @Input() lhToDonate: number;
  @Input() association: string;

  submitted = false;
  model: BachecaPost = null;
  bachecaPostForm: UntypedFormGroup;
  handler: any = null;
  success: boolean = false;
  failure: boolean = false;
  alreadyDone: boolean = false;

  // categories
  categories: HelpCategory[] = [];
  public cat1Id: number = null;
  public cat2Id: number = null;
  public cat3Id: number = null;
  public catImg: string = null;

   // image
   public imageUploaded = false;
   public uploading = false;

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private as: AuthenticationService,
    private cs: CategoryService,
    private bs: BachecaService,
    private rs: ResponseService,
    private checkout: CheckoutService
  ) { }

  ngOnInit(): void {
    this.initCreatePost();
    this.likehelps = this.activeRoute.snapshot.queryParams.likehelps;
    this.lhToDonate = this.activeRoute.snapshot.queryParams.lhToDonate;

     // images (removed: now handled by onFileSelected)
    this.loadStripe();
  }

  private initForm() {
    this.bachecaPostForm = this.formBuilder.group({
      description: [this.model.description, Validators.required]
    });
}

  private initCreatePost() {
    // bacheca post
    this.model = new BachecaPost();
    this.model.idCreator = this.as.currentUserValue.id;
    this.model.description = '';
    this.model.image = null;
    this.model.idHelp = this.activeRoute.snapshot.params.idHelp;
    this.model.idResponder = this.activeRoute.snapshot.params.idResponder;

    // form validation
    this.initForm();
}

// convenience getter for easy access to form fields
get f() { return this.bachecaPostForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.bachecaPostForm.invalid) {
      // form is invalid
      return;
    } else {
      // get forms value
      this.model.description = this.f.description.value;

      // image
      const i = this.responses.length - 1;
      const image = this.responses[i];
      if (image != null) {
        this.model.image = image.data.public_id;
      }
    }
    this.addPost();
  }

  donate() {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KYRwCFzyQwg0ebiijora1CJCpaAejO1J0WSMNtwuvjrLxrHTdcr9tpxyPJx6nGFvdMgx2pMVEXi6z7UQuQyrkgy00sMjvHmPW',
      locale: 'auto',
      token: function (striteToken: any) {
        console.log(striteToken)
        paymentStripe(striteToken)
      },
    });

    const paymentStripe = (striteToken: any) => {
      this.checkout.makePayment(striteToken, this.as.currentUserValue.email,this.lhToDonate * 100).subscribe((data:any) => {
        console.log(data);

        if (data.data === "success") {
          this.success = true
        } else {
          this.failure = true
        }
      });
    };

    handler.open({
      name: 'Rehelp demo',
      description: 'A simple payment',
      amount: this.lhToDonate * 100,
    });
  }

  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KYRwCFzyQwg0ebiijora1CJCpaAejO1J0WSMNtwuvjrLxrHTdcr9tpxyPJx6nGFvdMgx2pMVEXi6z7UQuQyrkgy00sMjvHmPW',
          locale: 'auto',
          token: function (striteToken: any) {
            console.log(striteToken)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

private addPost() {
    this.bs.addBachecaPost(this.model).subscribe(x => {
      this.postResponse();
      },
      err => {
        console.log(err);
      });
}

private postResponse() {
  this.rs.postResponse(this.activeRoute.snapshot.params.idResponse).subscribe(x => {

    this.as.currentUserValue.likehelps = this.likehelps;
    this.as.refresh(this.as.currentUserValue);
    this.router.navigate(['bacheca']);
  },
    err => {
      console.log(err);
    });
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

}
