import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private activeForm: string;

  readonly subTitles = [
    { icon: 'stop', title: 'Turn those nasty habits on opportunities to support associations you care about'},
    { icon: 'peace', title: 'Create a peacefull and friendly environment around you'},
    { icon: 'challenge', title: 'Challenge yourself and the others to be aware of your daily swears' }];

  get active(): boolean { return this.activeForm === 'register'; }

  constructor() {
    this.activeForm = 'login';
  }

  setActive(form: string): void {
    this.activeForm = form;
  }

}
