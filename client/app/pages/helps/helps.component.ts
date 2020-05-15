import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, UserService, TypeService } from '@app/services';
import { Help, User, HelpType } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.scss']
})
export class HelpsComponent implements OnInit {

  user: User;
  helps: Help[] = [];
  type: HelpType;
  currentUser: User = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private hs: HelpService,
    private as: AuthenticationService,
    private ts: TypeService,
    private us: UserService) {
    this.getCurrentUser();
  }

  ngOnInit() {
    const codeType =
      this.activeRoute.snapshot.queryParamMap.get('type')
        ? this.activeRoute.snapshot.queryParamMap.get('type')
        : 'MEH';
    console.log('codeType', codeType);
    const excludeUserId = this.currentUser.id;
    const accepted = false;
    const idCreator = null;
    const distance = null;
    const lat = this.currentUser.latitude;
    const long = this.currentUser.longitude;

    // get type
    this.ts.getByCode(codeType).subscribe(type => {
      this.type = type;
      this.hs.getAll(type.code, excludeUserId, accepted, idCreator, distance, lat, long).subscribe(x => {
          this.helps = x;
      });
      this.us.getById(excludeUserId).subscribe(x => {
        this.user = x;
      });
    });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  getRemainingTime(date: Date) {
    const now = moment(Date());
    const then = moment(date);
    console.log('date', date);
    const timespan = now.diff(then);
    console.log('timespan', timespan);
    if (timespan < 0) {
      return 'scaduto';
    } else {
      const resultDate = moment.utc(timespan);
      const result = resultDate.format('HH') + ' ore ' + resultDate.format('mm') + ' minuti';
      console.log('result', result);
      return result;
    }
  }

  checkAcceptedResponses(responses) {
      return responses.some((response) => {
          return response.accepted !== true;
      });
  }

  likeHelpController() {
      return this.currentUser?.likehelps > 0;
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
