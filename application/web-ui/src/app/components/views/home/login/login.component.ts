import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AuthLogin } from 'src/app/models';
import { AuthService, FormFactory } from 'src/app/services';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';
import { UserForm } from 'src/app/services/forms/groups';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  @Output() activeEvent = new EventEmitter<string>();

  private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

  hide = true;
  loginForm: FormGroup;

  readonly errorMessages = ErrorMessages;
  readonly patterns = Patterns;

  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }
  get password_type(): string { return this.hide ? 'password' : 'text'; }
  get password_icon(): string { return this.hide ? 'hidden' : 'visible'; }

  constructor(private authService: AuthService, private router: Router, private forms: FormFactory) {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  login(): void {
    this.authService.logIn(this.credentials(this.username, this.password)).pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.handleSuccess(), err => this.forms.handleErrorMessages(err));
  }

  toggleForm(): void {
    this.loginForm.reset();
    this.activeEvent.emit('register');
  }

  private init(): void {
    this.loginForm = this.forms.builder().group(this.loginGroup());
  }

  private handleSuccess(): void {
    this.forms.handleSuccessMessages('Welcome Back ' + this.username.value + ' !');
    this.loginForm.reset();
    this.router.navigate(['/dashboard']);
  }

  private credentials = (username: AbstractControl, password: AbstractControl): AuthLogin => new AuthLogin(username.value, password.value);

  private loginGroup = (): any => ({ username: UserForm.username, password: UserForm.password });

}
