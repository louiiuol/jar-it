import { Validators } from '@angular/forms';
import { Patterns } from '../utils';

export const JarForm = {

    title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(Patterns.text)
    ]],
    description: ['', [
        Validators.maxLength(144),
        Validators.pattern(Patterns.text)
    ]],
    referenceCost: ['', [
        Validators.required,
        Validators.min(0.1),
        Validators.max(2)
    ]],
    maxAmount: ['', [
        Validators.required,
        Validators.min(0),
        Validators.max(50)
    ]],
    closingDate: ['', [
        Validators.required
    ]],
    addressee: [null, [
        Validators.required
    ]],
    members: ['', []],

};
