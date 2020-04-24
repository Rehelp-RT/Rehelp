import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  navbarOpen = false;

  constructor(
      private router: Router,
      private authService: AuthenticationService
  ) { }

  ngOnInit() {
      this.currentUser = this.authService.currentUserValue;
  }

  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }
}
