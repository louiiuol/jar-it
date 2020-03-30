import { Component } from '@angular/core';
import { Config } from '../../ressources/config';

@Component({ selector: 'app-root',
  template: `
  <!-- <app-navbar></app-navbar>
  <main class="container mat-typography">
    <app-loader></app-loader>
    <router-outlet></router-outlet>
  </main> -->
  <!-- <app-footer></app-footer> -->
  `})
export class AppComponent {

  constructor() {}

  get title() { return Config.title; }

}
