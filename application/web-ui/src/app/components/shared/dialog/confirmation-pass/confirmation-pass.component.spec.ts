import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormFactory } from 'src/app/services';
import { ConfirmationPassMock } from 'src/app/models/utils/mocks';
import { ConfirmationPassComponent } from './confirmation-pass.component';

describe('ConfirmationPassComponent', () => {

  let component: ConfirmationPassComponent;
  let fixture: ComponentFixture<ConfirmationPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationPassComponent],
      imports: [MatDialogModule],
      providers: [FormFactory, { provide: MAT_DIALOG_DATA, useValue: ConfirmationPassMock },
        { provide: MatDialogRef, useValue: {} } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
