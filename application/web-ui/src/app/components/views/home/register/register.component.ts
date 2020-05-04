import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterInfo } from 'src/app/models';
import { ParentErrorStateMatcher, FormFactory } from 'src/app/services/forms/form.factory';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  @Output() private readonly activeEvent = new EventEmitter<string>();

  registerForm: FormGroup;
  passwordForm: FormGroup;
  readonly errorMessages = this.forms.errorMessages;
  readonly parentErrorStateMatcher = new ParentErrorStateMatcher();
  readonly minDate: Date = this.nowMinusYears(115);
  readonly maxDate: Date = this.nowMinusYears(18);
  avatar = 'unknown';

  hidden = { pass: true, confirm: true };

  constructor(
    private authService: AuthService,
    protected snackBar: MatSnackBar,
    public forms: FormFactory,
  ) { }

  get username(): AbstractControl { return this.registerForm.get('username'); }
  get email(): AbstractControl { return this.registerForm.get('email'); }
  get birthDate(): AbstractControl { return this.registerForm.get('birthDate'); }
  get password(): AbstractControl { return this.passwordForm.get('password'); }
  get confirm(): AbstractControl { return this.passwordForm.get('confirm'); }
  get agree(): AbstractControl { return this.registerForm.get('agree'); }

  ngOnInit(): void {
    this.passwordForm = this.forms.passwordForm;
    this.registerForm = this.forms.buildForm('register');
  }

  register(): void {
    const registerCredentials
      = new RegisterInfo(this.username.value, this.email.value, this.password.value, this.birthDate.value, this.avatar);
    this.authService.signUp(registerCredentials).subscribe( () => {
      this.forms.handleSuccessMessages('You registered with success, Well done !');
      this.toggleForm();
    }, error => this.forms.handleErrorMessages(error) );
  }

  toggleForm() {
    this.passwordForm.reset();
    this.registerForm.reset();
    this.activeEvent.emit('login');
  }

  private nowMinusYears(years: number) {
    return new Date(new Date().setFullYear(new Date().getFullYear() - years));
  }

  onPick(picked: string) {
    this.avatar = picked;
  }

}
