import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { HelpService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-helps-edit',
  templateUrl: './helps-edit.component.html',
  styleUrls: ['./helps-edit.component.css']
})
export class HelpsEditComponent implements OnInit {

  helpsForm: FormGroup;
  id: number = null;

  constructor(
    private formBuilder: FormBuilder,
    private activeAouter: ActivatedRoute,
    private router: Router,
    private hs: HelpService
  ) { }

  ngOnInit() {

    this.getDetail(this.activeAouter.snapshot.params['id']);

    this.helpsForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
    });
  }

  getDetail(id) {
    this.hs.getHelps(id)
      .subscribe(data => {
        this.id = data.id;
        this.helpsForm.setValue({
          title: data.title
        });
        console.log(data);
      });
  }
  updateHelps(form: NgForm) {

    this.hs.updateHelps(this.id, form)
      .subscribe(res => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
