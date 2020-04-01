import { Validators, FormBuilder, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ErrorMessages, Patterns } from 'src/resources'
@Injectable({ providedIn: 'root' })
export class FormFactory {

    constructor(protected fb: FormBuilder) {
        this.fb = new FormBuilder();
    }

    readonly patterns = Patterns;

    readonly errorMessages = ErrorMessages;

    readonly userForm = {
        username: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(this.patterns.alphanumeric)
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
