import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'rehelp-web';

    constructor(private router: Router, private loadingService: LoadingService) {}

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadingService.show();
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.loadingService.hide();
            }
        });
    }
}
