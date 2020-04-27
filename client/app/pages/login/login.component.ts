import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/services';
import { AlertService } from '@app/shared/components/alert';

import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnParam = 'returnUrl';
    returnUrl: string;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    private socialUser: SocialUser;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService,
      private authService: AuthService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
            return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }


  // convenience getter for easy access to form fields
  get s() { return this.socialUser; }
  signInWithFB() {
    // this.submitted = true;
    // this.loading = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser, 'social user facebook');
      console.log(this.socialUser.email, 'email');
      console.log(this.socialUser.firstName, 'firstName');
      console.log(this.socialUser.lastName, 'lastName');
      console.log(this.socialUser.photoUrl, 'photoUrl');
    });
  }

}
