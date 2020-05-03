import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with login form', () => {
    expect(component.activeForm).toEqual('login');
  });

  it('should toggle to register form', () => {
    const formName = 'register';
    component.setActive(formName);
    expect(component.activeForm).toEqual(formName);
  });

  it('should load sub-titles', () => {
    const subs = component.subTitles;
    expect(subs.length).toEqual(3);
  });

});
