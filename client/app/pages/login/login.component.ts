import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/services';
import { AlertService } from '@app/shared/components/alert';

import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
    returnParam = 'returnUrl';
    returnUrl: string;
    loginForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    public socialUser: SocialUser;
    private googleAuthSubscription: Subscription;

  constructor(
      private formBuilder: UntypedFormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService,
      private alertService: AlertService,
      private socialAuthService: SocialAuthService,
      private userService: UserService
  ) {
      // redirect to home if already logged in
      if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams[this.returnParam] || '/';

      this.googleAuthSubscription = this.socialAuthService.authState
          .pipe(filter(user => user?.provider === GoogleLoginProvider.PROVIDER_ID))
          .subscribe(user => this.signInWithGoogle(user));
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  signInLocal() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      this.authService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              () => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  signInWithFacebook() {
      this.submitted = true;
      this.loading = true;
      this.socialAuthService
        .signIn(FacebookLoginProvider.PROVIDER_ID)
        .then(() => {
          // on success
          this.socialAuthService.authState.subscribe((user) => {
              this.socialUser = user;
          });
        }).then (() => {
          this.authService.socialLogin(this.socialUser)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        })
        .catch(err => {
          // on error
          this.alertService.error(err);
          this.loading = false;
          this.submitted = false;
        });
  }

  // Google Identity Services doesn't allow signIn() for Google: the user clicks
  // <asl-google-signin-button> and the signed-in user arrives through authState
  signInWithGoogle(user: SocialUser) {
    this.submitted = true;
    this.loading = true;
    this.socialUser = user;
    this.authService.socialLogin(user)
      .pipe(first())
      .subscribe(
          () => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
              this.submitted = false;
          });
  }

  ngOnDestroy() {
      this.googleAuthSubscription?.unsubscribe();
  }

}
