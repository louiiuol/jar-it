import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static areEqual(formGroup: FormGroup) { // To improve
    let value: any;
    let valid = true;
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl =  formGroup.controls[key] as FormControl;
        if (value === undefined || value === null || value === '') {
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

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirm').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirm').setErrors({ NoPassswordMatch: true });
    }
  }

}
