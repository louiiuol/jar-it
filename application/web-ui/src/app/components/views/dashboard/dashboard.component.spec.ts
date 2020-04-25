import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services';

class MockAuthService {
  logged = false;
  isLoggedIn() { return this.logged; }
  getCurrentUser() { return {
    username: 'tester42',
    avatar: 'unknown'
  }; }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule ],
      providers: [{provide: AuthService, useClass: MockAuthService}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user', () => {
    spyOn(authService, 'getCurrentUser').and.returnValue(true);
    expect(component.user).toBeDefined();
  });

});
