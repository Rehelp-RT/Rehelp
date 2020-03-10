import { Component, OnInit } from '@angular/core';
import { User, Help } from '@app/_models';
import { AuthenticationService, UserService } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

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


  constructor(
    private actRoute: ActivatedRoute,
    private as: AuthenticationService,
    private us: UserService) { }

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
    const userLikeHelp = this.user.likehelps;

    // list of user's incompleted help
    const incompletedHelps = this.user.helps.filter(h => {
      if (h.completed === false) {
        return h;
      }
    });

    // check if user has enough likehelps
    const checkLikeHelps = userLikeHelp - incompletedHelps.length > 0 ? true : false;
    console.log(incompletedHelps.length, 'incompletedHelps');
    console.log(userLikeHelp, 'userLikeHelp');
    console.log(checkLikeHelps, 'checkLikeHelps');
    return checkLikeHelps;
  }

}
