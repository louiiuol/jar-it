import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { IconComponent } from './icon/icon.component';
import { LoaderService } from './loader/loader.service';
export { LoaderService } from './loader/loader.service';

export const SharedComponents = [
    NavbarComponent,
    LoaderComponent,
    IconComponent,
];
export const SharedEntriesComponents = [
    IconComponent
];
export const SharedServices = [
    LoaderService
];
