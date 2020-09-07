import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DistanceService, HelpService, UserService, TypeService, CategoryService } from '@app/services';
import { Help, User, HelpType, HelpCategory, HelpResponse } from '@app/models';
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
    defaultDistance: Number[] = [10, 20, 50, 100];
    public selectedDistance = null;
    lat: Number = null;
    long: Number = null;

    // category
    categories: HelpCategory[] = [];
    public idCat1 = null;
    public idCat2 = null;
    public idCat3 = null;

    constructor(
        private activeRoute: ActivatedRoute,
        private hs: HelpService,
        private as: AuthenticationService,
        private cs: CategoryService,
        private ds: DistanceService,
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
        this.lat = this.currentUser.latitude;
        this.long = this.currentUser.longitude;

        // get type
        this.ts.getByCode(codeType).subscribe(type => {
            this.type = type;
            this.hs.getAll(type.code, excludeUserId, accepted, idCreator, distance, this.lat, this.long).subscribe(x => {
                this.helps = x;
                // console.log(this.helps)
            });
            this.us.getById(excludeUserId).subscribe(x => {
                this.user = x;
            });
            this.cs.getAll(type.id).subscribe((cats) => {
                this.categories = cats;
            });
        });
    }

    getCurrentUser(): void {
        this.as.getCurrentUser().subscribe(x => {
            this.currentUser = x;
        });
    }

    isExpired(help: Help): boolean {
        const now = moment.utc();
        const then = moment.utc(help.dateEndValidity);
        const timespan = then.diff(now);
        return timespan < 0;
    }

    getRemainingTime(date: Date) {
        const now = moment.utc();
        const then = moment.utc(date);
        const timespan = then.diff(now);

        if (timespan < 0) {
            return 'scaduto';
        } else {
            const t = moment.utc(timespan);
            let result = '';
            if (t.hours() > 1) {
                result += t.format('HH') + ' ore ';
            } else if (t.hours() == 1) {
                result += t.format('HH') + ' ora ';
            }

            if (t.minutes() > 1) {
                result += t.format('mm') + ' minuti ';
            } else if (t.minutes() == 1) {
                result += t.format('mm') + ' minuto ';
            }

            return result;
        }
    }

    getDayFromNow(date) {
        moment.locale('it');
        const day = moment().utc(date);
        const result = day.startOf('day').fromNow();
        return result;
    }

    checkAcceptedResponses(responses: HelpResponse[]) {
        return responses.some(response => {
            return response.accepted !== true;
        });
    }

    getDistance(latitude: number, longitude: number) {
      const distance = this.ds.calcCrow(latitude, longitude, this.currentUser.latitude, this.currentUser.longitude);
      if (distance < 1) {
          return (distance * 1000).toFixed(0) + ' metri';
      } else {
          return distance.toFixed(1).replace('.', ',') + ' km';
      }
  }

    likeHelpController() {
        return this.currentUser?.likehelps > 0;
    }

    filter() {
        var cat = this.idCat2 != null ? this.idCat2 : this.idCat1;
        this.hs.getAll(
            this.type.code,
            this.currentUser.id,
            false,
            null,
            this.selectedDistance,
            this.lat,
            this.long,
            cat
        )
        .subscribe((x) => {
            this.helps = x;
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
