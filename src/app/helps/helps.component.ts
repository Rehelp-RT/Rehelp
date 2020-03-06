import { Component, OnInit } from '@angular/core';
import { HelpService, AuthenticationService } from '@app/_services';
import { Help, User } from '@app/_models';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.css']
})
export class HelpsComponent implements OnInit {

  helps: Help[] = [];
  currentUser: User = null;

  constructor(
    private hs: HelpService,
    private as: AuthenticationService) {
      this.getCurrentUser();
    }

  ngOnInit() {
    const type = 'MEH';
    this.getHelps(type);
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  checkAcceptedResponses(responses) {
    return responses.some((response) => {
      return response.accepted !== true;
    });
  }

  getHelps(type: string): void {

    this.hs.getByType(type)
        .subscribe(x => {
          const helpsList = x.filter(y => y.creator.id !== this.currentUser.id 
                                && this.checkAcceptedResponses(y.responses));
            this.helps = helpsList;
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
