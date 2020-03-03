import { Component, OnInit, Input } from '@angular/core';
import { Help, HelpResponse } from '@app/_models';
import { ResponseService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helps-detail-responses',
  templateUrl: './helps-detail-responses.component.html',
  styleUrls: ['./helps-detail-responses.component.css']
})
export class HelpsDetailResponsesComponent implements OnInit {

  @Input() help: Help;
  accepted = false;
  completed = false;

  constructor(private rs: ResponseService, private router: Router) { }

  ngOnInit() {
  }

  accept(response: HelpResponse): void {
    this.accepted = true;
    this.rs.acceptResponse(response)
      .subscribe(x => {
        console.log(x);
      });
  }

  cancel(response: HelpResponse): void {
    this.accepted = false;
    this.rs.cancelResponse(response)
      .subscribe(x => {
        console.log(x);
      });
  }

  complete(response: HelpResponse): void {
    this.completed = true;
    this.rs.completeResponse(response)
      .subscribe(x => {
        console.log(x);
      });
  }


  deleteResponse(response: HelpResponse): void {
    this.rs.deleteResponse(response)
      .subscribe(x =>
        this.router.navigate(['/helps/, model.id'])
      );
  }


}
