import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, UserService } from '@app/services';
import { Help, User } from '@app/models';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.css']
})
export class HelpsComponent implements OnInit {

  user: User;
  helps: Help[] = [];
  currentUser: User = null;

  constructor(
    private hs: HelpService,
    private as: AuthenticationService,
    private us: UserService) {
      this.getCurrentUser();
    }

  ngOnInit() {
    const type = 'MEH';
    const excludeUserId = null //this.currentUser.id;
    const accepted = null //false;
    const idCreator = null;
    const distance = 20;
    const lat = 43.0554254;
    const long = 13.4303147;    
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
    if (this.user) {
      // number of user's likehelps
      const userLikeHelp = this.user.likehelps;
      // list of user's incompleted help
      const incompletedHelps = this.user.helps.filter(h => {
        if (h.completed === false) {
          return h;
        }
      });
      // check if user has enough likehelps
      const checkLikeHelps = userLikeHelp - incompletedHelps.length > 0 ? true : false;
      return checkLikeHelps;
    }
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
