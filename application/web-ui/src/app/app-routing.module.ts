import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { AuthGuard, UserGuard } from './services/security/guards';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';

const routes: Routes = [

  { path: 'welcome',
    component: HomeComponent,
    canActivate: [AuthGuard] },

    { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard] },

  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
