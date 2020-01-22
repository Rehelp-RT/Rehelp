import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelpService} from '../_services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-helps-add',
  templateUrl: './helps-add.component.html',
  styleUrls: ['./helps-add.component.css']
})
export class HelpsAddComponent implements OnInit {

  
  helpsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private hs: HelpService) { }

  ngOnInit() {    
    this.helpsForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
    });
  }
 
  addHelps() {
    const payload = {
      title: this.helpsForm.controls.title.value,
    };
 
    this.hs.addHelps(payload)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/helps']);
        }, (err) => {
          console.log(err);
        });
  }
}
