import { Validators } from '@angular/forms';
import { Patterns } from '../utils';

export const JarForm = {

    title: ['Quiet Please', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(Patterns.alphanumeric)
    ]],
    description: ['A place to relax ...', [
        Validators.maxLength(144),
        Validators.pattern(Patterns.alphanumeric)
    ]],
    referenceCost: [0.5, [
        Validators.required,
        Validators.min(0.1),
        Validators.max(2)
    ]],
    maxAmount: [20, [
        Validators.required,
        Validators.min(10),
        Validators.max(100)
    ]],
    closingDate: [Patterns.minJarDuration(), [
        Validators.required
    ]],
    addressee: [null, [
        Validators.required
    ]],
    members: [null, [] ],

};
