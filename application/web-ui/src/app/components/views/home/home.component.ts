import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  activeForm: string;

  readonly subTitles = [
    { icon: 'stop', title: 'Turn those nasty habits on opportunities to support actions you like'},
    { icon: 'peace', title: 'Create peacefull and friendly environment around you'},
    { icon: 'challenge', title: 'Challenge yourself and the others to be aware'}
  ];

  constructor() {
    this.activeForm = 'login';
  }

  setActive(form: string): void {
    this.activeForm = form;
  }

}
