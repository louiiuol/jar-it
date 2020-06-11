import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, PageNotFoundComponent, DashboardComponent, UserProfileComponent } from './components/views';
import { AnonymousGuard, UserGuard, AdminGuard } from './services/security/guards';
import { AdminBoardComponent } from './components/views/admin-board/admin-board.component';
import { JarDetailsComponent } from './components/views/jar-details/jar-details.component';
import { JarResolver } from './services/domain/jar/jar.resolve';

export const routes: Routes = [

    { path: '',
        component: HomeComponent,
        canActivate: [AnonymousGuard] },

    { path: 'admin',
        component: AdminBoardComponent,
        canActivate: [AdminGuard]
    },

    { path: 'profile',
        component: UserProfileComponent,
        canActivate: [UserGuard]
    },

    { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [UserGuard]
    },

    {
        path: 'jars/:id',
        component: JarDetailsComponent,
        resolve: {
            jar: JarResolver
        }
    },

    { path: '404', component: PageNotFoundComponent },

    { path: '**', redirectTo: '/404', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
