import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthLogin } from 'src/app/models';
import { AuthService } from 'src/app/services/security/auth/auth.service';
import { FormFactory } from 'src/app/services/forms/form.factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  @Output() activeEvent = new EventEmitter<string>();

  hide = true;
  loginForm: FormGroup;
  readonly errorMessages = this.forms.errorMessages;
  private sub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    public forms: FormFactory,
  ) { }

  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.loginForm = this.forms.buildForm('login');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  login(): void {
    const credentials = new AuthLogin(this.username.value, this.password.value);
    this.sub = this.authService.logIn(credentials).subscribe( () => {
      this.forms.handleSuccessMessages('Welcome Back ' + this.username.value + ' !');
      this.router.navigate(['/dashboard']);
    }, err => this.forms.handleErrorMessages(err) );
  }

  toggleForm(): void {
    this.loginForm.reset();
    this.activeEvent.emit('register');
  }

}
