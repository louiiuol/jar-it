import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <main class="container mat-typography">
    <router-outlet></router-outlet>
  </main>
  `
})
export class AppComponent {
  constructor() {}
}
