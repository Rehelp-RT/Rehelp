import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
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

  constructor(
    private router: Router,
    private ns: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  @ViewChild('navdrop', null) navdrop: ElementRef;
  dropClick() {
    this.navdrop.nativeElement.classList.toggle("show");
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

  checkNotification(n : number):void {
    this.ns.checkNotification(n)
    .subscribe(x => {
      this.navdrop.nativeElement.classList.toggle("show");
    })
  }
}
