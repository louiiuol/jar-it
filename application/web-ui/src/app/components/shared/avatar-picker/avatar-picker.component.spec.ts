import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AvatarPickerComponent } from './avatar-picker.component';
import { MatMenuModule } from '@angular/material/menu';

describe('AvatarPickerComponent', () => {
  let component: AvatarPickerComponent;
  let fixture: ComponentFixture<AvatarPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarPickerComponent],
      imports: [ MatMenuModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pick selected icon', () => {
    const spied = spyOn(component.picked, 'emit');
    component.select('m4');
    expect(spied).toHaveBeenCalledTimes(1);
  });

});
