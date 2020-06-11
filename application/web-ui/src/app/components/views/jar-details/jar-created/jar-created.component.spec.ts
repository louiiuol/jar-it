import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarCreatedComponent } from './jar-created.component';

describe('JarCreatedComponent', () => {
  let component: JarCreatedComponent;
  let fixture: ComponentFixture<JarCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
