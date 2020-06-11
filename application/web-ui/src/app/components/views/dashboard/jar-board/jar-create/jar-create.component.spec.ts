import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarCreateComponent } from './jar-create.component';

describe('JarCreateComponent', () => {

    let component: JarCreateComponent;
    let fixture: ComponentFixture<JarCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ JarCreateComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JarCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
