import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Help } from '@app/_models';
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-helps-edit',
  templateUrl: './helps-edit.component.html',
  styleUrls: ['./helps-edit.component.css']
})

export class HelpsEditComponent implements OnInit {

  @Input() help: Help = null;
  helpsForm: FormGroup;
  id: number = null;
  submitted = false;
  model: Help = null;

  constructor(
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private hs: HelpService
  ) { 
    this.model = this.help;
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.submitted = true;
    this.hs.updateHelp(this.model).subscribe(
      res => {
        this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
