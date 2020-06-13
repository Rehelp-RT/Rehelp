import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Notification, User } from '@app/models';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    @Input() currentUser: User;
    @Input() showName: boolean;
    notifications: Notification[] = [];
    isOpen = false;
    //readonly VAPID_PUBLIC_KEY = "BMFfBA24EM7OSESBe6gRHhuKB1u2YHGUnL-wlEzKUh7gJ_Vnd9dKSwuw64TeMvfc5r1KNZc7Mkpk-92O51TmHTU";


    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private eRef: ElementRef) { }

    ngOnInit() {
        if (this.currentUser != null) {
            setInterval(() => {
                this.callFuntionAtIntervals();
            }, 120000);
        }
    }

    callFuntionAtIntervals() {
        this.notificationService.getByUser(this.currentUser.id)
            .subscribe(res => {
                this.notifications = res;
            }, (err) => {
                console.error('errore :', err);
            });
    }

    navigate(id: number) {
        this.isOpen = false;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/helps/', id]);
    }

    checkNotification(n: Notification) {
        this.isOpen = false;
        
        this.notificationService.checkNotification(n.id)
            .subscribe(x => {
                n.checked = true;

                // remove notification from array
                var index = this.notifications.indexOf(n);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            });
    }
}
