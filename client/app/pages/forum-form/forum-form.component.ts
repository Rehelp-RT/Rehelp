import { HttpClient } from '@angular/common/http';
import { AuthenticationService, CategoryService, HelpService, TypeService } from '@app/services';
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
import { ForumPost, HelpCategory, User, HelpType } from '@app/models';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {

  model: ForumPost = null;

  // categories
  categories: HelpCategory[] = [];
  public cat1Id: number = null;
  public cat2Id: number = null;
  public cat3Id: number = null;
  public catImg: string = null;

  constructor(
    // private http:HttpClient,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private as: AuthenticationService,
        private cs: CategoryService,
        private hs: HelpService,
        private ts: TypeService,
        private cloudinary: Cloudinary,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader

  ) { }

  ngOnInit(): void {
    this.initCreatePost();

     // images
    // this.initImages();
  }

  private initCreatePost() {
    // forum post
    this.model = new ForumPost();
    this.model.idCreator = this.as.currentUserValue.id;
    this.model.description = '';

    // categories
    this.initCategories();

    // form validation
    this.initForm();

    // maps
    this.initMaps();
}

private initCategories() {
  // categories
  this.cs.getAll().subscribe(x => {
      this.categories = x;
      // console.log('cats', this.categories)

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

  onSubmit(data) {
    this.http.post('http://localhost:3000/buratti',data).subscribe((result)=>{
      console.warn("result",result)
    })
    console.warn(data);
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



  

}
