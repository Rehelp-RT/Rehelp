import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { UserService, AuthenticationService } from '@app/services';
import { AlertService } from '@app/shared/components/alert';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      cf: ['', [Validators.required, Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registrazione avvenuta con successo', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
