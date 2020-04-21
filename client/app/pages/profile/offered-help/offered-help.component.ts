import { Component, OnInit } from '@angular/core';
import { HelpResponse } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '@app/services';

@Component({
  selector: 'app-offered-help',
  templateUrl: './offered-help.component.html',
  styleUrls: ['./offered-help.component.css']
})
export class OfferedHelpComponent implements OnInit {

  responses: HelpResponse[] = [];

  constructor(private route: ActivatedRoute, private rs: ResponseService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      const idResponder = params.id;

      this.rs.getAll(idResponder, true).subscribe(x => {
          console.log('x', x);
          this.responses = x;
      });
    });
  }

}
