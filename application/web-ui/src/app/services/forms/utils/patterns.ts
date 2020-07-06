import { AbstractControl } from '@angular/forms';
const fn = {
    nowMinusYears: (years: number) => new Date(new Date().setFullYear(new Date().getFullYear() - years))
};

export const Patterns = {

    url: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    alphanumeric: /^\w+$/,
    text: /[a-z0-9]|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\,|\.|\?|\/|\""|\;|\à|\ç|\:|\s/gi,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    avatarPatern: /[gm][0-1][0-9]/,

    isValid: (ctrl: AbstractControl, err: any): boolean => ctrl.hasError(err.type) && (ctrl.dirty || ctrl.touched),

    isEmpty: (str: string): boolean => (!str || 0 === str.length),

    isBlank: (str: string): boolean => (!str || /^\s*$/.test(str)),

    majority: (): Date => fn.nowMinusYears(18),

    oldestAlive: (): Date => fn.nowMinusYears(130),

    minJarDuration: (): Date => new Date(Date.now() + (2629746000 / 2)),

    maxJarDuration: (): Date => new Date(Date.now() + (2629746000 * 2)),

    now: (): Date => new Date(Date.now())

};
