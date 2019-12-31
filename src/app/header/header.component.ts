import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  navbarOpen = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
