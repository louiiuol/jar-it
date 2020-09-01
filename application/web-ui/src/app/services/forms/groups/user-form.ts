import { Validators, FormControl } from '@angular/forms';
import { Patterns } from '../utils/patterns';

export const UserForm = {
  username: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern(Patterns.alphanumeric)
  ]],
  birthDate: [new Date(), [
    Validators.required
  ]],
  email: new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(Patterns.email)
  ])),
  agree: new FormControl(false, Validators.requiredTrue),
  password: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25),
    Validators.pattern(Patterns.password)
  ])),
  avatar: new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(Patterns.alphanumeric)
  ])),
  confirm: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25),
    Validators.pattern(Patterns.password)
  ])),
  optionalPassword: new FormControl('', Validators.compose([
    Validators.minLength(6),
    Validators.maxLength(25),
    Validators.pattern(Patterns.password)
  ])),
  optionalConfirm: new FormControl('', Validators.compose([
    Validators.minLength(6),
    Validators.maxLength(25),
    Validators.pattern(Patterns.password)
  ]))
};
