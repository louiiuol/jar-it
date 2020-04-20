import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async( () => {
    TestBed.configureTestingModule({
      declarations: [ IconComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render from icons source folder', () => {
    component.avatar = false;
    expect(component.href).toBe('assets/img/icons.svg#undefined');
  });

  it('should render from avatar source folder', () => {
    component.avatar = true;
    expect(component.href).toBe('assets/img/avatars.svg#undefined');
  });

  it('should render with specified name', () => {
    component.avatar = false;
    component.name = 'test';
    expect(component.href).toBe('assets/img/icons.svg#test');
  });

});
