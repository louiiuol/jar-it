import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarOverComponent } from './jar-over.component';

describe('JarOverComponent', () => {
  let component: JarOverComponent;
  let fixture: ComponentFixture<JarOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
