import { Component } from '@angular/core';
import {
  AuthenticationService,
  CategoryService,
  HelpService
} from '@app/_services';
import { Router } from '@angular/router';
import { HelpCategory, Help, User } from '@app/_models';

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent {
  categories: HelpCategory[] = [];
  model: Help = null;
  submitted = false;
  currentUser: User;

  constructor(
    private cs: CategoryService,
    private router: Router,
    private hs: HelpService,
    private as: AuthenticationService
  ) {
    this.as.currentUser.subscribe(x => {
      console.log(x);
      this.currentUser = x;
      this.model = new Help();
      this.model.idCreator = this.currentUser.id;
      this.model.idType = 1;
    });
    this.cs.getAll().subscribe(x => {
      this.categories = x;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.hs.addHelp(this.model).subscribe(
      res => {
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );
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
