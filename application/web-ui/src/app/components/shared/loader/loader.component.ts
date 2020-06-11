import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
    selector: 'app-loader',
    template: `<div *ngIf="isLoading | async" class="overlay">
        <mat-progress-spinner class="spinner" [color]="'primary'" [mode]="'indeterminate'" [value]="50">
        </mat-progress-spinner>
    </div>`,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {

  get isLoading(): BehaviorSubject<boolean> { return this.loaderService.isLoading; }

  constructor(private loaderService: LoaderService) { }

}
