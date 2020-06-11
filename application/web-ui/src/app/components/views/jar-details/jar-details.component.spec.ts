import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarDetailsComponent } from './jar-details.component';

describe('JarDetailsComponent', () => {

    let component: JarDetailsComponent;
    let fixture: ComponentFixture<JarDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ JarDetailsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JarDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
