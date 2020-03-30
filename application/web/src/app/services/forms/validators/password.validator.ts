import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
    static areEqual(formGroup: FormGroup) {
        let value: any;
        let valid = true;
        for (const key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                const control: FormControl =  formGroup.controls[key] as FormControl;
                if (value === undefined) {
                    value = control.value;
                } else {
                    if (value !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return { areEqual: true };
    }
}
