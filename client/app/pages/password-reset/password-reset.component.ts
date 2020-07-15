import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/services';
import { AlertService } from '@app/shared/components/alert';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  returnParam = 'returnUrl';
    returnUrl: string;
    passwordResetForm: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[this.returnParam] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.passwordResetForm.controls; }

  resetPassword() {
    this.submitted = true;
    console.log(this.passwordResetForm.invalid, 'invalid');
    // stop here if form is invalid
    if (this.passwordResetForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.resetPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error, 'error')
          this.alertService.error(error);
          this.loading = false;
          this.submitted = false;
        });
  }
}
