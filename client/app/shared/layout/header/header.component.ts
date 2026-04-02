import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService, NotificationService } from '@app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
    currentUser: User;
    navbarOpen = false;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(x =>
            this.currentUser = x
        );
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    // sendMessage() {
    //     this.ns.sendMessage(30,43.0554254,13.4303147).subscribe(x => 
    //         console.log(x)
    //     );
    // }
}
