import { Component } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HelpService } from '../_services';
import { Router } from '@angular/router';
import { Help } from '@app/_models';

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent {

  powers = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'];

  model = new Help();
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

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
