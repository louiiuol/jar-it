import { Component, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserService, FormFactory } from 'src/app/services';
import { UserViewDetails, AuthLogin, UserUpdate } from 'src/app/models';
import { ErrorMessages, Patterns, FormMessages, SuccessMessages } from 'src/app/services/forms/utils';
import { UserForm, PasswordOptionalForm } from 'src/app/services/forms/groups';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy {

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once
    currentUser: UserViewDetails;
    profileForm: FormGroup;
    updatePasswordForm: FormGroup;
    avatarForm: string;
    readonly hidden = { pass: true, confirm: true };
    readonly errorMsg = ErrorMessages.user;
    readonly patterns = Patterns;

    get username(): AbstractControl { return this.profileForm.get('username'); }
    get email(): AbstractControl { return this.profileForm.get('email'); }
    get birthDate(): AbstractControl { return this.profileForm.get('birthDate'); }
    get password(): AbstractControl { return this.updatePasswordForm.get('password'); }
    get password_type(): string { return this.hidden.pass ? 'password' : 'text'; }
    get password_icon(): string { return this.hidden.pass ? 'hidden' : 'visible'; }
    get confirm(): AbstractControl { return this.updatePasswordForm.get('confirm'); }
    get confirm_type(): string { return this.hidden.confirm ? 'password' : 'text'; }
    get confirm_icon(): string { return this.hidden.confirm ? 'hidden' : 'visible'; }

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private forms: FormFactory) {
        this.init();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    onPick(picked: string): void {
        this.avatarForm = picked;
    }

    update() {
        this.forms.confirmationPass(FormMessages.confirm_pass).pipe(takeUntil(this.destroyed$))
            .subscribe((data) => {
                !!data.confirmed ? this.updateConfirmed(data.password)
                    : this.forms.handleErrorMessages(ErrorMessages.pass_required);
            });
    }

    reset() {
        this.forms.confirmationStep(FormMessages.reset).pipe(takeUntil(this.destroyed$))
            .subscribe((confirm) => { if (!!confirm) { this.setInitialForm(this.currentUser); }});
    }

    close() {
        this.forms.confirmationStep(FormMessages.close_account).pipe(takeUntil(this.destroyed$))
            .subscribe((confirm) => this.handleClosingSuccess(confirm) );
    }

    isValidForm = (): boolean => (this.updatePasswordForm.valid && this.profileForm.valid)
        && (this.avatarChanged() || this.informationsChanged() || this.passwordChanged())

    private init(): void {
        this.profileForm = this.forms.builder().group({
            username: UserForm.username,
            email: UserForm.email,
            birthDate: UserForm.birthDate
        });
        this.updatePasswordForm = PasswordOptionalForm;
        this.authService.whoami().pipe(takeUntil(this.destroyed$))
            .subscribe( (current) => this.setInitialForm(current) );
    }

    private avatarChanged = (): boolean => this.avatarForm !== this.currentUser.avatar;

    private informationsChanged = (): boolean => this.username.value !== this.currentUser.username
        || this.email.value !== this.currentUser.email || this.birthDate.value !== this.currentUser.birthDate

    private passwordChanged = (): boolean => !this.updatePasswordForm.pristine
        && ((this.password.value !== '') || (this.confirm.value !== ''))

    private setInitialForm(user: UserViewDetails): void {
        this.currentUser = user;
        this.avatarForm = user.avatar;
        this.profileForm.reset({ username: user.username, email: user.email, birthDate: user.birthDate });
        this.updatePasswordForm.reset();
    }

    private getUpdatedFields(pass: string): UserUpdate {
        const updated = new UserUpdate(pass);
        if (this.avatarForm !== this.currentUser.avatar) { updated.avatar = this.avatarForm; }
        if (this.username.value !== this.currentUser.username) { updated.username = this.username.value; }
        if (this.email.value !== this.currentUser.email) { updated.email = this.email.value; }
        if (this.birthDate.value !== this.currentUser.birthDate) { updated.birthDate = this.birthDate.value; }
        if (this.password.value !== null) { updated.password = this.password.value; }
        return updated;
    }

    private updateConfirmed(pass: string): void {
        this.userService.update(this.getUpdatedFields(pass), this.currentUser.id).pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.handleUpdateSuccess(pass), err => this.forms.handleErrorMessages(err));
    }

    private handleUpdateSuccess(pass: string): void {
        this.authService.reloadToken(new AuthLogin(this.username.value, pass), false)
            .subscribe(() => {
                this.forms.handleSuccessMessages(SuccessMessages.update_profile);
                this.authService.whoami().subscribe((user) => this.setInitialForm(user));
            });
    }

    private handleClosingSuccess(confirm: any): void {
        if (!!confirm) {
            this.userService.close(this.currentUser.id)
                .subscribe(() => {
                    this.authService.logOut();
                    this.forms.handleSuccessMessages(SuccessMessages.close_account);
                });
        }
    }

}
