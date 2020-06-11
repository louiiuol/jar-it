import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Provides Service to handle Loader Component behaviour
 */
@Injectable({ providedIn: 'root' })
export class LoaderService {

  readonly isLoading = new BehaviorSubject(false);

  constructor() {}

  show(): void {
    this.isLoading.next(true);
  }

  hide(): void {
    this.isLoading.next(false);
  }

}
