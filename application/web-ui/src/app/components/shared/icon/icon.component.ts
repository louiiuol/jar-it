import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg>
      <use [attr.xlink:href]="href"></use>
    </svg>`,
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {

  @Input() private readonly name: string;
  @Input() private readonly avatar: boolean;

  get href(): string { return `assets/img/${this.avatar ? 'avatars' : 'icons'}.svg#${this.name}`; }

  constructor() { }

}
