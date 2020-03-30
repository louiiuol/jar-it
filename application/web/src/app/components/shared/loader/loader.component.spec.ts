import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { MatProgressSpinner } from '@angular/material';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoaderService } from './loader.service';

class MockLoaderService {
    isLoggedIn = new BehaviorSubject(false);
}

fdescribe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            LoaderComponent,
            { provide: LoaderService, useClass: MockLoaderService }
        ]
        });
        // inject both the component and the dependent service.
        component = TestBed.inject(LoaderComponent);
        let service = TestBed.inject(LoaderService);
    });

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        providers: [
            LoaderComponent,
            // MatProgressSpinner,
            { provide: LoaderService, useClass: MockLoaderService }
        ],
    })
    .compileComponents();
    }));

    beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


