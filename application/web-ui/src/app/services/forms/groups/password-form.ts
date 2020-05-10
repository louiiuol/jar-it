import { FormGroup, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../utils/password.validator';
import { UserForm } from './user-form';

export const PasswordRequiredForm = new FormGroup(
  { password: UserForm.password, confirm: UserForm.confirm },
  (formGroup: FormGroup) => PasswordValidator.areEqual(formGroup));

export const PasswordOptionalForm = new FormBuilder().group(
  { password: UserForm.optionalPassword, confirm: UserForm.optionalConfirm },
  { validator: PasswordValidator.passwordMatchValidator });

export const PasswordOnlyForm = new FormBuilder().group({ password: UserForm.password });
