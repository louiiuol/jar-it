import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Config } from '../../ressources/config';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { IconComponent } from './shared/icon/icon.component';
import { MatMenu, MatToolbar } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
        // NavbarComponent,
        // LoaderComponent,
        // IconComponent,
        // MatMenu,
        // MatToolbar
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(Config.title);
  });

});
