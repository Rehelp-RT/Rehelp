import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiRequest = request.url.startsWith('/api');
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && isApiRequest) {
                this.authenticationService.logout();
                location.reload();
            }

            const error = err?.error?.message || err?.message || err?.statusText || err;
            return throwError(() => error);
        }));
    }
}
