import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Notification, User } from '@app/models';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() currentUser: User;
  notifications: Notification[] = [];
  notificationsNumber: number;
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
    private eRef: ElementRef) {
    // if (swPush.isEnabled) {
    //   swPush
    //     .requestSubscription({
    //       serverPublicKey: this.VAPID_PUBLIC_KEY,
    //     })
    //     .then(subscription => {
    //       // send subscription to the server
    //     })
    //     .catch(console.error)
    // }
  }

  ngOnInit() {
    if (this.currentUser != null) {
      interval(3000)
        .pipe(
          startWith(0),
          switchMap(() => this.notificationService.getByUser(this.currentUser.id))
        )
        .subscribe(res => {
          this.notifications = res;
          this.notificationsNumber = res.length;
        });
    }
  }

  navigate(id: number) {
    this.isOpen = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/helps/', id]);
  }

  getNotifications(): void {
    this.notificationService.getByUser(this.currentUser.id)
      .subscribe(x => {
        this.notifications = x;
        this.notificationsNumber = this.notifications.length;
      },
        (err) => {
          console.error('errore :', err);
        });
  }

  checkNotification(n: Notification) {
    this.isOpen = false;
    this.notificationsNumber--;
    this.notificationService.checkNotification(n.id)
      .subscribe(x => {
        n.checked = true;
      });
  }
}
