import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/services';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        const isApiRequest = request.url.startsWith(environment.apiUrl) || request.url.startsWith('/api');
        if (currentUser && currentUser.token && isApiRequest) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUser.token
                }
            });
        }

        return next.handle(request);
    }
}
