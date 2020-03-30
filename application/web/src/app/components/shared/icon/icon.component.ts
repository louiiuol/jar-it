import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    template: `<svg><use [attr.xlink:href]="href"></use></svg>`
})
export class IconComponent {

    iconSrc = 'assets/img/icons.svg#';
    avatarSrc = 'assets/img/avatars.svg#';

    get href() { return (!!this.avatar ? this.avatarSrc : this.iconSrc) + this.name; }

    @Input() name: string;
    @Input() avatar: boolean;

    constructor() {}

}
