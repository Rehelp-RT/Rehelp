import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpService } from '@app/_services';
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

  }
}
