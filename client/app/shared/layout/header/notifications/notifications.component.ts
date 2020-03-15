import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '@app/shared/components';
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
    private ns: NotificationService,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
    this.getNotifications();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getNotifications(){    
    this.ns.getByUser(this.currentUser.id).subscribe(x => {
      this.notifications = x;
    },
    (err) => {console.log('errore :', err)});
  }
}
