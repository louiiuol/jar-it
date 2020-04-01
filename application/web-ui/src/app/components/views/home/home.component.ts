import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() {}

  active = 'login';

  subTitles = [
    { icon: 'stop', title: 'Turn those nasty habits on opportunities to support actions you like'},
    { icon: 'peace', title: 'Create peacefull and friendly environment around you'},
    { icon: 'challenge', title: 'Challenge yourself and the others to be aware'}
  ];

  setActive($event: any): void { this.active = $event; }

}
