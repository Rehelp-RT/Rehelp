import { Component } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HelpService } from '../_services';
import { Router } from '@angular/router';
import { Help, Category } from '@app/_models';
import { CategoryService } from '@app/_services/category.service';

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent {

  categories: Category[] = [];
  model = new Help();
  submitted = false;

  constructor(
    private cs: CategoryService,
    private router: Router,
    private hs: HelpService) {
    this.cs.getAll()
    .subscribe(x => {
        this.categories = x;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.hs.addHelp(this.model)
      .subscribe(res => {
        this.router.navigate(['/helps']);
      },
      (err) => {
        console.log(err);
      });
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
