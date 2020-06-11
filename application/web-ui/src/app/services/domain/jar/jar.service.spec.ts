import { TestBed } from '@angular/core/testing';

import { JarService } from './jar.service';

describe('JarService', () => {

    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: JarService = TestBed.inject(JarService);
        expect(service).toBeTruthy();
    });

});
