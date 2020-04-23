import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
