import { Component, OnInit } from '@angular/core';
import { HelpService } from '../_services';
import { Help } from '../_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  help: Help = null;

  constructor(private hs: HelpService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.params['id'];
    this.getHelp(id);
  }

  getHelp(id: number): void {
    this.hs.getById(id)
        .subscribe(x => {
          this.help = x;
        });
  }
}
