import { Component, OnInit } from '@angular/core';
import { Help } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '@app/services';

@Component({
  selector: 'app-requested-help',
  templateUrl: './requested-help.component.html',
  styleUrls: ['./requested-help.component.css']
})
export class RequestedHelpComponent implements OnInit {

  helps: Help[] = [];

  constructor(private route: ActivatedRoute, private hs: HelpService) { }

  ngOnInit() {
      this.route.parent.params.subscribe(params => {
        const idCreator = params.id;

        this.hs.getAll(null, null, null, idCreator).subscribe(x => {
            console.log('x', x);
            this.helps = x;
        });
      });
  }

}
