import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<svg><use [attr.xlink:href]="href"></use></svg>`
})
export class IconComponent {

  @Input() name: string;
  @Input() avatar: boolean;

  private base = 'assets/img/';
  private prefix = 'icons.svg#';
  private prefixForAvatar = 'avatars.svg#';

  get href() { return this.base +  (!!this.avatar ? this.prefixForAvatar : this.prefix) + this.name; }

  constructor() { }

}
