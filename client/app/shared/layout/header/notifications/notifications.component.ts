import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/models';
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
        this.notifications = x;
      },
        (err) => {
          console.log('errore :', err)
        });
  }

  checkNotification(n: number): void {
    this.ns.checkNotification(n)
      .subscribe(x => {
        console.log("notification checked");
      })
  }
}
