import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models';
import { UserService, AuthenticationService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/components';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent implements OnInit {

  // model
  submitted = false;
  loading = false;
  passwordEditForm: FormGroup;
  model: User = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private as: AuthenticationService,
    private us: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.activeRouter.parent.params.subscribe(params => {
      this.us.getById(params.id).subscribe(x => {
        // model
        this.model = x;
      });
    });

    this.passwordEditForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.passwordEditForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.passwordEditForm.invalid) {
      // form is invalid
      return;
    } else {
      // get forms value
      this.model.password = this.f.password.value;
      this.us.updatePassword(this.model).subscribe(
        () => {
          this.alertService.success('Password cambiata con successo', true);
          this.router.navigate(['/profile/' + this.model.id]);
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        }
      );
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
