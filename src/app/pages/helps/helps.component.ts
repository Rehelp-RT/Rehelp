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
    const excludeUserId = this.currentUser.id;
    const accepted = false;
    this.getHelps(type, excludeUserId, accepted);
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

  getHelps(type: string, excludeUserId: number, accepted: boolean): void {
    this.hs.getAll(type, excludeUserId, accepted)
        .subscribe(x => {
            this.helps = x;
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
