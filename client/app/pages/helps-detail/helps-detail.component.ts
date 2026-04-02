import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService, HelpService } from '@app/services';
import { Help, User } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/shared/components';
import * as moment from 'moment';

@Component({
    selector: 'app-helps-detail',
    templateUrl: './helps-detail.component.html',
    styleUrls: ['./helps-detail.component.scss'],
    standalone: false
})
export class HelpsDetailComponent implements OnInit {

    help: Help = null;
    currentUser: User = null;
    isHelpCompleted: boolean;

    constructor(
        private location: Location,
        private hs: HelpService,
        private actRoute: ActivatedRoute,
        private router: Router,
        private modalService: ModalService,
        private as: AuthenticationService) { }

    ngOnInit() {
        const id = this.actRoute.snapshot.params.id;
        this.getHelp(id);
        this.currentUser = this.as.currentUserValue;
    }

    getHelp(id: number): void {
        this.hs.getById(id)
            .subscribe(help => {
                this.help = help;
        });
    }

    isExpired(help: Help): boolean {
        const now = moment.utc();
        const then = moment.utc(help.dateEndValidity);
        const timespan = then.diff(now);
        return timespan < 0;
    }

    getStatus(): string {
        if (this.help.posted) {
            return 'Post aggiunto in bacheca';
        } else if (this.help.completed) {
            return 'Completato';
        } else if (this.help.reviewed) {
            return 'Recensito';
        } else if (this.help.accepted) {
            return 'Accettato';
        } else if (this.isExpired(this.help)) {
            return 'Scaduto';
        } else  {
            return 'In accettazione';
        }
    }

    getImage(help: Help) {
        if (help.image != null) {
            return 'https://res.cloudinary.com/hwbyvepex/image/upload/v1582196512/' + help.image;
        } else if (help.category.image != null) {
            return 'assets/img/categories/' + help.category.image;
        } else {
            return 'assets/img/placeholder-help.png';
        }
    }

    getRemainingTime(date: Date) {
        const now = moment.utc();
        const then = moment.utc(date);
        const timespan = then.diff(now);
        
        if (timespan < 0) {
            return '';
        } else {
            const t = moment.utc(timespan);
            let result = '(';
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

            return result + ')';
        }
    }

    deleteHelp() {
        if (this.help.idCreator == this.as.currentUserValue.id) {
            // can delete
            this.hs.deleteHelp(this.help).subscribe(x =>
              this.router.navigate(['/profile/' + this.help.idCreator])
            );
        }
    }

    openModal(id: string) {
      this.modalService.open(id);
    }

    closeModal(id: string) {
      this.modalService.close(id);
    }

    back() {
      this.location.back();
    }

}
