import { TestBed, inject } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [LoaderService]
        });
    });

    it('should be created', inject([LoaderService], (service: LoaderService) => {
        expect(service).toBeTruthy();
    }));

    it('shouldn\'t be loading by default', inject([LoaderService], (service: LoaderService) => {
        const actual = service.isLoading.getValue();
        expect(actual).toBeFalsy();
    }));

    it('shouldn\'t be loading when hide() triggered', inject([LoaderService], (service: LoaderService) => {
        service.isLoading.next(true);
        service.hide();
        const actual = service.isLoading.getValue();
        expect(actual).toBeFalsy();
    }));

    it('should be loading when show() triggered', inject([LoaderService], (service: LoaderService) => {
        service.show();
        const actual = service.isLoading.getValue();
        expect(actual).toBeTruthy();
    }));

});
