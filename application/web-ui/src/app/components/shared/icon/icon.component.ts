import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-icon',
    template: `<svg> <use [attr.xlink:href]="href"></use> </svg>`,
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None // Styles propagate to the entire app
})
export class IconComponent {

    @Input() readonly name: string;
    @Input() readonly avatar: boolean;

    get href(): string { return `assets/img/${this.avatar ? 'avatars' : 'icons'}.svg#${this.name}`; }

    constructor() { }

}
