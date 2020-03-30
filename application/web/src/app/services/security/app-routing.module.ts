import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, DashboardComponent, PageNotFoundComponent } from 'src/app/components/views';
import { AuthGuard, UserGuard } from './guards';

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
  exports: [RouterModule],
  declarations: []
}) export class AppRoutingModule {}
