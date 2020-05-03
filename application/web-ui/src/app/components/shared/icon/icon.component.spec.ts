import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {

  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach( () => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render from icons source folder', () => {
    expect(component.href).toBe('assets/img/icons.svg#undefined');
  });

  it('should render from avatar source folder', () => {
    // tslint:disable-next-line: no-string-literal
    (component as any).avatar = true;
    expect(component.href).toBe('assets/img/avatars.svg#undefined');
  });

  it('should render with specified name', () => {
    (component as any).name = 'test';
    expect(component.href).toBe('assets/img/icons.svg#test');
  });

});
