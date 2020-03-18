import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Notification, User } from '@app/models';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    @Input() currentUser: User;
    notifications: Notification[] = [];
    notCheckedNotifications: Notification[] = [];
    isOpen = false;

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            console.log('clicked inside');
        } else {
            console.log('clicked outside');
        }
    }

    constructor(
        private router: Router,
        private ns: NotificationService,
        private eRef: ElementRef) { }

    ngOnInit() {
        this.getNotifications();
    }

    navigate(id: number) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/helps/', id]);
    }

    getNotifications(): void {
        this.ns.getByUser(this.currentUser.id)
            .subscribe(x => {
              this.notifications = x;
              this.notCheckedNotifications = x.filter(y => y.checked !== true);
            },
            (err) => {
              console.log('errore :', err);
            });
    }

    checkNotification(n: Notification) {
        this.ns.checkNotification(n.id)
          .subscribe(x => {
              n.checked = true;
          });
    }
}
