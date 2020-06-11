import { Validators } from '@angular/forms';
import { Patterns } from '../utils/patterns';

export const AssociationForm = {
    name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern(Patterns.text)
    ]],
    code: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
        Validators.pattern(Patterns.alphanumeric)
    ]],
    description: ['', [
        Validators.maxLength(255),
        Validators.pattern(Patterns.text)
    ]],
    link: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(Patterns.url)
    ]],

};
