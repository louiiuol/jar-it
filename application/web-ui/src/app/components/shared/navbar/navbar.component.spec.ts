import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { routes } from 'src/app/app.routing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/security/auth/auth.service';

describe('NavbarComponent', () => {

  let authService: AuthService;
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let location: Location;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, MatMenuModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.ngZone.run(() => { router.initialNavigation(); });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldn\'t get user informations when not logged', () => {
    authService.logOut();
    expect(component.user).toBeNull();
  });

  it('should log out', () => {
    fixture.ngZone.run(fakeAsync(() => {
      const spy = spyOn(authService, 'logOut');
      component.logout();
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });

});
