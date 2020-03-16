import { Component, OnInit } from '@angular/core';
import { User, Help } from '@app/models';
import { AuthenticationService, UserService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/components/alert';

@Component({
  selector: 'app-meet-and-help',
  templateUrl: './meet-and-help.component.html',
  styleUrls: ['./meet-and-help.component.css']
})
export class MeetAndHelpComponent implements OnInit {
  user: User;
  help: Help;
  currentUser: string = null;
  isSyncAnimated = true;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };



  constructor(
    private actRoute: ActivatedRoute,
    private as: AuthenticationService,
    private us: UserService,
    protected alertService: AlertService) { }

  ngOnInit() {
    // get current user
    this.as.currentUser.subscribe(cu => {
      this.currentUser =
        cu === undefined || cu == null
          ? null
          : cu.username;
      const id = this.actRoute.snapshot.params.id;
      // get user profile
      if (id == null) {
        this.us.getById(cu.id).subscribe(x => {
          this.user = x;
        });
      } else {
        this.us.getById(id).subscribe(x => {
          this.user = x;
        });
      }
    });
  }

  likeHelpController() {
    // number of user's likehelps
    const userLikeHelp = this.user ? this.user.likehelps : null;

    if (this.user) {
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

}
