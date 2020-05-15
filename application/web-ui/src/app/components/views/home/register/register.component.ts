import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ErrorMessages, Patterns, SuccessMessages, ParentErrorStateMatcher } from 'src/app/services/forms/utils';
import { FormFactory, AuthService } from 'src/app/services';
import { UserForm, PasswordRequiredForm } from 'src/app/services/forms/groups';
import { RegisterInfo } from 'src/app/models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {

    @Output() private readonly activeEvent = new EventEmitter<string>();

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once
    registerForm: FormGroup;
    readonly errorMsg = ErrorMessages.user;
    readonly patterns = Patterns;
    readonly parentErrorStateMatcher = new ParentErrorStateMatcher();
    avatar = 'unknown';
    hidden = { pass: true, confirm: true };

    get username(): AbstractControl { return this.registerForm.get('username'); }
    get email(): AbstractControl { return this.registerForm.get('email'); }
    get birthDate(): AbstractControl { return this.registerForm.get('birthDate'); }
    get password(): AbstractControl { return this.registerForm.get('passwordForm').get('password'); }
    get password_type(): string { return this.hidden.pass ? 'password' : 'text'; }
    get password_icon(): string { return this.hidden.pass ? 'hidden' : 'visible'; }
    get confirm(): AbstractControl { return this.registerForm.get('passwordForm').get('confirm'); }
    get confirm_type(): string { return this.hidden.confirm ? 'password' : 'text'; }
    get confirm_icon(): string { return this.hidden.confirm ? 'hidden' : 'visible'; }
    get agree(): AbstractControl { return this.registerForm.get('agree'); }

    constructor(private authService: AuthService, private forms: FormFactory) {
        this.init();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    register(): void {
        this.authService.signUp(this.credentials()).pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.handleRegisterSuccess(), error => this.forms.handleErrorMessages(error));
    }

    toggleForm() {
        this.registerForm.reset();
        this.activeEvent.emit('login');
    }

    onPick(picked: string) {
        this.avatar = picked;
    }

    private init() {
        this.registerForm = this.forms.builder().group(this.registerGroup());
    }

    private registerGroup = (): any => ({
        username: UserForm.username,
        email: UserForm.email,
        birthDate: UserForm.birthDate,
        passwordForm: PasswordRequiredForm,
        agree: UserForm.agree
    })

    private credentials = (): RegisterInfo =>
        new RegisterInfo(this.username.value, this.email.value, this.password.value, this.birthDate.value, this.avatar)

    private handleRegisterSuccess(): void {
        this.forms.handleSuccessMessages(SuccessMessages.register);
        this.toggleForm();
    }

}
