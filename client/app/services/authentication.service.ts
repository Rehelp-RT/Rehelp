import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '@app/models';
import { SocialUser } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    public getCurrentUser(): Observable<User> {
        return this.currentUser;
      }

    public register(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/signup`, user)
        .pipe(map(newUser => {
          if (newUser && newUser.token) {
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            this.currentUserSubject.next(newUser);
          }
        }));
    }

    public login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/signin`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    public socialLogin(socialUser: SocialUser) {
        return this.http.post<any>(`${environment.apiUrl}/socialLogin`, socialUser)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    public sendRecaptchaToken(token) {
      console.log(token, 'token');
      return this.http.post<any>(`${environment.apiUrl}/recaptcha_token_validate`, {recaptcha: token});
    }

    public refresh(user: User) {
        this.currentUserSubject.next(user);
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
