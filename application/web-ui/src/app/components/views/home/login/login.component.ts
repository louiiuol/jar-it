import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { AuthService, FormFactory } from 'src/app/services';
import { AuthLogin } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor( protected authService: AuthService, public forms: FormFactory, protected fb: FormBuilder ) {}

  hide = true;
  loginForm: FormGroup;
  readonly errorMessages = this.forms.errorMessages;

  @Output() activeEvent = new EventEmitter<string>();

  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl  { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.loginForm = this.fb.group( {
      username: this.forms.userForm.username,
      password: this.forms.userForm.password
    });
  }

  login(): void {
    const credentials = new AuthLogin(this.username.value, this.password.value);
    if (!!credentials.username) { this.authService.logIn(credentials); }
  }

  showRegister(): void {
    this.loginForm.reset();
    this.activeEvent.emit('register');
  }

}
