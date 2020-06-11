import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarActiveComponent } from './jar-active.component';

describe('JarActiveComponent', () => {
  let component: JarActiveComponent;
  let fixture: ComponentFixture<JarActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
