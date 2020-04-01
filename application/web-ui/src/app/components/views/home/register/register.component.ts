import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService, PasswordValidator, FormFactory, ParentErrorStateMatcher } from 'src/app/services';
import { RegisterInfo, AuthLogin } from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Config } from 'src/resources';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService, private fb: FormBuilder, public forms: FormFactory, protected snackBar: MatSnackBar) {}

  registerForm: FormGroup;
  passwordForm: FormGroup;
  readonly errorMessages = this.forms.errorMessages;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  hide = true;
  hideConfirm = true;

  @Output() activeEvent = new EventEmitter<string>();

  get username(): AbstractControl { return this.registerForm.get('username'); }
  get email(): AbstractControl { return this.registerForm.get('email'); }
  get password(): AbstractControl { return this.passwordForm.get('password'); }
  get confirm(): AbstractControl { return this.passwordForm.get('confirm'); }
  get agree(): AbstractControl { return this.registerForm.get('agree'); }

  ngOnInit(): void {
    this.createForms();
  }

  register(): void {
    const registerCredentials = new RegisterInfo(this.username.value, this.email.value, this.password.value);
    this.authService.signUp(registerCredentials).subscribe(
      () => this.logIn(),
      error => this.displayError(error)
    );
  }

  showLogin() {
    this.passwordForm.reset();
    this.activeEvent.emit('login');
  }

  private createForms(): void {
    this.passwordForm = new FormGroup(
      { password: this.forms.userForm.password, confirm: new FormControl('', Validators.required) },
      (formGroup: FormGroup) => PasswordValidator.areEqual(formGroup)
    );
    this.registerForm = this.fb.group({
      username: this.forms.userForm.username,
      email: this.forms.userForm.email,
      passwordForm: this.passwordForm,
      agree: new FormControl(false, Validators.requiredTrue)
    });
  }

  private displayError(error: any) {
    const errors = error.error.errors;
    if ( !!errors ) {
            const errorMessages: string[] = [];
            errors.forEach( ( err: any ) => { errorMessages.push(err.error); } );
            this.snackBar.open(errorMessages.join(Config.crlf), 'close');
          }
  }

  private logIn() {
    const loginCredentials = new AuthLogin(this.username.value, this.password.value);
    this.authService.logIn(loginCredentials);
  }

}
