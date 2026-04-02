import { HttpClient } from '@angular/common/http';
import { AuthenticationService, CategoryService, ForumPostService, HelpService, TypeService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

// model
import { ForumPost, HelpCategory, User, HelpType } from '@app/models';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {
  @Input()
  responses: Array<any> = [];

  submitted = false;
  model: ForumPost = null;
  forumPostForm: UntypedFormGroup;

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
        private fps: ForumPostService,
        private ts: TypeService
  ) { }

  ngOnInit(): void {
    this.initCreatePost();
  }

  private initForm() {
    this.forumPostForm = this.formBuilder.group({
      description: [this.model.description, Validators.required],
      title: [this.model.title, Validators.required]
    });
}

  private initCreatePost() {
    // forum post
    this.model = new ForumPost();
    this.model.idCreator = this.as.currentUserValue.id;
    this.model.description = '';
    this.model.title = '';

    // form validation
    this.initForm();

    // categories
    this.initCategories();
}

private initCategories() {
  // categories
  this.cs.getAll().subscribe(x => {
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
      }
  });
}

// convenience getter for easy access to form fields
get f() { return this.forumPostForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.forumPostForm.invalid) {
      // form is invalid
      return;
    } else {
      // get forms value
      this.model.description = this.f.description.value;
      this.model.title = this.f.title.value;

      // image
      const i = this.responses.length - 1;
      const image = this.responses[i];
      if (image != null) {
        this.model.image = image.data.public_id;
      }

      // category
      this.model.idCategory = this.cat3Id ? this.cat3Id : (this.cat2Id ? this.cat2Id : this.cat1Id);

    }
    this.addPost();
  }

private addPost() {
    this.fps.addForumPost(this.model).subscribe(x => {
      console.log(x)
      this.router.navigate(['forum/detail/', x.id]);
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
