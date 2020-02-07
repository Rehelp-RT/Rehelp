import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpService, CategoryService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Help, HelpCategory } from '@app/_models';
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

  constructor(
    private cs: CategoryService,
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private hs: HelpService
  ) { 
    const id = this.activeRouter.snapshot.params.id;
    console.log(id)
    this.hs.getById(id).subscribe(x => {
          this.model = x;
          this.model.title = x.title;
          this.model.idCategory = x.idCategory;
          this.model.description = x.description;
        });
        this.cs.getAll().subscribe(x => {
          this.categories = x;
        });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    console.log("salva?")
    this.hs.updateHelp(this.model).subscribe(
      res => {
        console.log("forse?")
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
