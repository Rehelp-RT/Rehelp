import { Component, OnInit } from '@angular/core';
import { HelpService } from '../_services';
import { Help } from '../_models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  help: Help;
  helpId: number;

  constructor(private hs: HelpService,
    private actRoute: ActivatedRoute) { }
  
  ngOnInit() {  
    this.helpId = this.actRoute.snapshot.params['id'];
    this.getHelp();  
  }

  getHelp(): void {
    this.hs.getById(this.helpId)
        .subscribe(x => {
            this.help = x;
        });
  }
}
