import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models';
import { UserService, AuthenticationService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/components';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    // model
    submitted = false;
    loading = false;
    passwordResetForm: FormGroup;
    model: User = null;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private activeRoute: ActivatedRoute,
        private as: AuthenticationService,
        private us: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
      const token = this.route.snapshot.params.token;
      this.verifyToken(token);
       // load form
      this.passwordResetForm = this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        }, {
             validator: MustMatch('password', 'confirmPassword')
          });
    }

    verifyToken(token) {
      this.as.validPasswordToken(token).subscribe(
        x => {
          console.log(x, 'x');
        },
        err => {
          console.log(err, 'err');
        }
      );
    }


    get f() { return this.passwordResetForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.passwordResetForm.invalid) {
            // form is invalid
            return;
        } else {
            // get forms value
            this.model.password = this.f.password.value;
            this.us.updatePassword(this.model).subscribe(() => {
                this.alertService.success('Password cambiata con successo', true);
                this.router.navigate(['/']);
            },
            err => {
                this.alertService.error(err);
                this.loading = false;
            });
        }
    }

}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
