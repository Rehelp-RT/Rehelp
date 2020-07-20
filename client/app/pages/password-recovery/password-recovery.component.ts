import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/services';
import { AlertService } from '@app/shared/components/alert';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  returnParam = 'returnUrl';
    returnUrl: string;
    passwordRecoveryForm: FormGroup;
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
    this.passwordRecoveryForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[this.returnParam] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.passwordRecoveryForm.controls; }

  recoveryPassword() {
    this.submitted = true;
    console.log(this.passwordRecoveryForm.invalid, 'invalid');
    // stop here if form is invalid
    if (this.passwordRecoveryForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.recoveryPassword(this.f.email.value)
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
}
