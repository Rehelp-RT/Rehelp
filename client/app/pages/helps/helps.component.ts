import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, UserService } from '@app/services';
import { Help, User, HelpType } from '@app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.scss']
})
export class HelpsComponent implements OnInit {

  user: User;
  helps: Help[] = [];
  type: string;
  currentUser: User = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private hs: HelpService,
    private as: AuthenticationService,
    private us: UserService) {
    this.getCurrentUser();
  }

  ngOnInit() {
    const type =
      this.activeRoute.snapshot.queryParamMap.get('type')
        ? this.activeRoute.snapshot.queryParamMap.get('type')
        : 'MEH';
    console.log('type', type);
    const excludeUserId = this.currentUser.id;
    const accepted = null; // false;
    const idCreator = null;
    const distance = null;
    const lat = this.currentUser.latitude;
    const long = this.currentUser.longitude;
    this.hs.getAll(type, excludeUserId, accepted, idCreator, distance, lat, long).subscribe(x => {
        this.helps = x;
    });
    this.us.getById(excludeUserId).subscribe(x => {
      this.user = x;
    });
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

  likeHelpController() {
      return this.currentUser.likehelps > 0;
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
