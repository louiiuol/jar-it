import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

describe('LoaderComponent', () => {

  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let service: LoaderService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      providers: [ LoaderService ],
      imports: [ MatProgressSpinnerModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    service = TestBed.inject(LoaderService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


