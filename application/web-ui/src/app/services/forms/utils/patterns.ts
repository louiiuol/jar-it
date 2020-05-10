import { AbstractControl } from '@angular/forms';
const fn = {
  nowMinusYears: (years: number) => new Date(new Date().setFullYear(new Date().getFullYear() - years))
}

export const Patterns = {
  alphanumeric: /^\w+$/,
  text: /[a-z0-9]|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\,|\.|\?|\/|\""|\;|\à|\ç|\:|\s/ig,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  avatarPatern: /[gm][0-1][0-9]/,

  isValid: (ctrl: AbstractControl, err: any): boolean => ctrl.hasError(err.type) && (ctrl.dirty || ctrl.touched),

  isEmpty(str: string) {
    return (!str || 0 === str.length);
  },

  isBlank(str: string) {
    return (!str || /^\s*$/.test(str)) ;
  },

  majority: (): Date => fn.nowMinusYears(18),
  oldestAlive: (): Date => fn.nowMinusYears(130)
};
