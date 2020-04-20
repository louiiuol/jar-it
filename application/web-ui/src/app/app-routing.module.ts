import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { AuthGuard, UserGuard } from './services/security/guards';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';

export const routes: Routes = [

  { path: 'welcome',
    component: HomeComponent,
    canActivate: [AuthGuard] },

  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard] },

  { path: '404', component: PageNotFoundComponent },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  { path: '**', redirectTo: '/404', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
