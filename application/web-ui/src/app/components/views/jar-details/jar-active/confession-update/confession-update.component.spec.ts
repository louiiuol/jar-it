import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionUpdateComponent } from './confession-update.component';

describe('ConfessionUpdateComponent', () => {
    let component: ConfessionUpdateComponent;
    let fixture: ComponentFixture<ConfessionUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ConfessionUpdateComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfessionUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
