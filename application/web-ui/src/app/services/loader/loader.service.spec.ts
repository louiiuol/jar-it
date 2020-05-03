import { TestBed, async } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {

  let service: LoaderService;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.inject(LoaderService);
  }));

  it('should be created', () => {
      expect(service).toBeTruthy();
  });

  it('shouldn\'t be loading by default', () => {
      expect(service.isLoading.getValue()).toBeFalsy();
  });

  it('shouldn\'t be loading when hide() triggered', () => {
      service.isLoading.next(true);
      service.hide();
      expect(service.isLoading.getValue()).toBeFalsy();
  });

  it('should be loading when show() triggered', () => {
    service.show();
    expect(service.isLoading.getValue()).toBeTruthy();
  });

});
