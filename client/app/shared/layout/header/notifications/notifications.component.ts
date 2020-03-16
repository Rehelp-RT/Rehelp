import { Component, OnInit, Input } from '@angular/core';
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
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private ns: NotificationService) { }

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
        console.log("x :", x)
        this.notifications = x;
        this.notCheckedNotifications = x.filter(y => y.checked != true);
      },
      (err) => {
        console.log('errore :', err)
      });
  }

  checkNotification(n: Notification) {
    this.ns.checkNotification(n.id)
      .subscribe(x => {
        n.checked = true;
      })
  }
}
