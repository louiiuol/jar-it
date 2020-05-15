import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationCreateComponent } from './association-create.component';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormFactory } from 'src/app/services';
import { ConfirmationPassMock } from 'src/app/models/utils/mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AssociationCreateComponent', () => {
    let component: AssociationCreateComponent;
    let fixture: ComponentFixture<AssociationCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [AssociationCreateComponent],
        imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule],
        providers: [FormBuilder, FormFactory, { provide: MAT_DIALOG_DATA, useValue: ConfirmationPassMock },
            { provide: MatDialogRef, useValue: {} } ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssociationCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
