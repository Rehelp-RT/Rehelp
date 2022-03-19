import { HttpClient } from '@angular/common/http';
import { AuthenticationService, BachecaService, CategoryService, HelpService, ResponseService, TypeService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import * as moment from 'moment';

// image
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

// maps
import { MapsAPILoader, MouseEvent } from '@agm/core';

// model
import { HelpCategory, User, HelpType, Association } from '@app/models';
import { BachecaPost } from '@app/models/bachecaPost';
import { CheckoutService } from '@app/services/checkout.service';

@Component({
  selector: 'app-bacheca-form',
  templateUrl: './bacheca-form.component.html',
  styleUrls: ['./bacheca-form.component.css']
})
export class BachecaFormComponent implements OnInit {
  @Input()
  responses: Array<any> = [];
  @Input() likehelps: number;
  @Input() lhToDonate: number;
  @Input() association: string;

  submitted = false;
  model: BachecaPost = null;
  bachecaPostForm: FormGroup;
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
   public hasBaseDropZoneOver = false;
   public uploader: FileUploader;
   public imageUploaded = false;

  constructor(
    // private http:HttpClient,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private as: AuthenticationService,
    private cs: CategoryService,
    private bs: BachecaService,
    private rs: ResponseService,
    private checkout: CheckoutService,
    private cloudinary: Cloudinary,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    this.initCreatePost();
    this.likehelps = this.activeRoute.snapshot.queryParams.likehelps;
    this.lhToDonate = this.activeRoute.snapshot.queryParams.lhToDonate;
    // this.association = this.activeRoute.snapshot.queryParams.association;

     // images
    this.initImages();
    this.loadStripe();
    // TODO:
    // this.searchPayment();
  }

  private initForm() {
    this.bachecaPostForm = this.formBuilder.group({
      description: [this.model.description, Validators.required]
    });
}

  // private searchPayment() {

  // }

  private initCreatePost() {
    // bacheca post
    this.model = new BachecaPost();
    this.model.idCreator = this.as.currentUserValue.id;
    this.model.description = '';
    this.model.image = null;
    // TODO:
    this.model.idHelp = this.activeRoute.snapshot.params.idHelp;
    this.model.idResponder = this.activeRoute.snapshot.params.idResponder;



    // form validation
    this.initForm();

    // categories
    // this.initCategories();
}

// private initCategories() {
//   // categories
//   this.cs.getAll().subscribe(x => {
//       this.categories = x;
//       // console.log('cats', this.categories)

//       if (this.model.help.category) {
//           if (this.model.help.category.parent !== undefined && this.model.help.category.parent !== null) {
//               if (this.model.help.category.parent.parent !== undefined && this.model.help.category.parent.parent !== null) {
//                   this.cat3Id = this.model.help.category.id;
//                   this.cat2Id = this.model.help.category.parent.id;
//                   this.cat1Id = this.model.help.category.parent.parent.id;
//                   this.catImg = this.model.help.category.image;
//               } else {
//                   this.cat2Id = this.model.help.category.id;
//                   this.cat1Id = this.model.help.category.parent.id;
//                   this.catImg = this.model.help.category.image;
//               }
//           } else {
//               this.cat1Id = this.model.help.category.id;
//               this.catImg = this.model.help.category.image;
//           }
//       }
//   });
// }

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

      // category
      // this.model.help.idCategory = this.cat3Id ? this.cat3Id : (this.cat2Id ? this.cat2Id : this.cat1Id);
      
    }
    // console.log(this.model);
    this.addPost();
  }

  donate() {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KYRwCFzyQwg0ebiijora1CJCpaAejO1J0WSMNtwuvjrLxrHTdcr9tpxyPJx6nGFvdMgx2pMVEXi6z7UQuQyrkgy00sMjvHmPW',
      locale: 'auto',
      token: function (striteToken: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(striteToken)
        // alert('Token Created!!');

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
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(striteToken)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

private addPost() {
    // crea l'help
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

