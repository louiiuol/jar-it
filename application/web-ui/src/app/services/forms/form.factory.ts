import { Validators, FormBuilder, FormControl, AbstractControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { PasswordValidator } from './validators/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessages, HttpErrorMessages } from './error-messages';
import { Patterns } from './patterns';

@Injectable({ providedIn: 'root' })
export class FormFactory {

  readonly patterns = Patterns;

  readonly errorMessages = ErrorMessages;

    readonly userForm = {
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(this.patterns.alphanumeric)
      ]],
      birthDate: ['', [
        Validators.required
      ]],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(this.patterns.password)
      ] ) ),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.patterns.email)
      ]))
    };

  readonly passwordForm = new FormGroup(
    { password: this.userForm.password, confirm: new FormControl('', Validators.required) },
    (formGroup: FormGroup) => PasswordValidator.areEqual(formGroup));

  constructor(
    protected fb: FormBuilder,
    protected snackBar: MatSnackBar
  ) {
      this.fb = new FormBuilder();
    }

  buildForm(type: string): FormGroup {
    let formGroup: FormGroup;
    if (type === 'login') {
      formGroup = this.fb.group( {
        username: this.userForm.username,
        password: this.userForm.password
      });
    } else if (type === 'register') {
      formGroup = this.fb.group({
        username: this.userForm.username,
        email: this.userForm.email,
        birthDate: this.userForm.birthDate,
        passwordForm: this.passwordForm,
        agree: new FormControl(false, Validators.requiredTrue)
      });
    }
    return formGroup;
  }

  handleSuccessMessages(message: any) {
    this.snackBar.open(message, 'close', { duration: 1600 });
  }

  handleErrorMessages(err: any) {
    const errorMessages: string[] = [];
    if (err.status === 401) {
      errorMessages.push(HttpErrorMessages.invalidCredentials);
    } else if (err.status === 0) {
      errorMessages.push(HttpErrorMessages.unreachableApi);
    } else {
      const errors = err.error.errors;
      if ( !!errors ) {
        errors.forEach( ( current: any ) => { errorMessages.push(current.error); } );
      }
    }
    this.snackBar.open(errorMessages.join(' \r\n - '), 'close', { duration: 1600 });
  }

  isValid = (ctrl: AbstractControl, err: any): boolean => ctrl.hasError(err.type) && (ctrl.dirty || ctrl.touched);

}

export class ParentErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
    return (controlTouched && (controlInvalid || parentInvalid));
  }

}
