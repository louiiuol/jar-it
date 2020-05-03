import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceMockFull, loginMock } from 'src/app/models/utils/mocks';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from 'src/app/services/security/auth/auth.service';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [{provide: AuthService, useClass: AuthServiceMockFull}]
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user id', () => {
    authService.logIn(loginMock);
    expect(component.currentUser).toBeDefined();
  });

});
