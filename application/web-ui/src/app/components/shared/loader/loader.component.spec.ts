import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

describe('LoaderComponent', () => {

    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;
    let service: LoaderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoaderComponent ],
            providers: [ LoaderService ],
            imports: [ MatProgressSpinnerModule ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        service = TestBed.inject(LoaderService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});


