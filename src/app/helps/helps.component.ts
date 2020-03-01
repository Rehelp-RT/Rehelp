import { Component, OnInit } from '@angular/core';
import { HelpService } from '../_services';
import { Help } from '../_models';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.css']
})
export class HelpsComponent implements OnInit {

  helps: Help[] = [];

  constructor(private hs: HelpService) { }

  ngOnInit() {
    const type = 'MEH';
    this.getHelps(type);
  }

  getHelps(type: string): void {
    this.hs.getByType(type)
        .subscribe(x => {
            this.helps = x;
        });
  }
  /*
  deleteHelps(id, index) {
    this.hs.deleteHelps(id)
      .subscribe(res => {
          this.data.splice(index,1);
        }, (err) => {
          console.log(err);
        }
      );
  }*/

}
