import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    exports: [
        MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule,
        MatTableModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatGridListModule,
        MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatTooltipModule, MatDatepickerModule, MatSelectModule,
        MatStepperModule, MatChipsModule, MatAutocompleteModule, MatBadgeModule, MatNativeDateModule, MatExpansionModule,
        MatSortModule, MatPaginatorModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Defines custom 'Module schemas' to improve Angular cohesion
})
export class MaterialModule { }
