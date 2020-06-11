import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarBoardComponent } from './jar-board.component';

describe('JarBoardComponent', () => {
  let component: JarBoardComponent;
  let fixture: ComponentFixture<JarBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
