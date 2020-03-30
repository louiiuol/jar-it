import { HomeComponent } from './home/home.component';
export { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
export { DashboardComponent } from './dashboard/dashboard.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

export const ViewComponents = [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
];
