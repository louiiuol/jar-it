import { Component } from '@angular/core';
import { Config } from '../../ressources/config';

@Component({ selector: 'app-root',
  template: ` helloworld
  `})
export class AppComponent {

  constructor() {}

  get title() { return Config.title; }

}
