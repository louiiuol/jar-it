import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './components/app.component';
import {
    HomeComponent, LoginComponent, RegisterComponent, DashboardComponent,
    PageNotFoundComponent, UserProfileComponent, AdminBoardComponent,
    AssociationOfficeComponent, AssociationCreateComponent
} from './components/views';
import {
    AvatarPickerComponent, LoaderComponent, ConfirmationMessageComponent,
    ConfirmationPassComponent, FooterComponent, NavbarComponent, IconComponent
} from './components/shared';
import {
    LoaderService, AuthService, FormFactory, TokenInterceptor,
    AnonymousGuard, UserGuard
} from './services';
import 'hammerjs';
import { DescriptionFormatterPipe } from './services/pipes/description-formater.pipe';
import { JarCreateComponent } from './components/views/dashboard/jar-board/jar-create/jar-create.component';
import { JarDetailsComponent } from './components/views/jar-details/jar-details.component';
import { ConfessComponent } from './components/shared/confess/confess.component';
import { JarPreviewComponent } from './components/views/dashboard/jar-board/jar-preview/jar-preview.component';
import { MembersUpdateComponent } from './components/shared/members-update/members-update.component';
import { JarBoardComponent } from './components/views/dashboard/jar-board/jar-board.component';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { JarResolver } from './services/domain/jar/jar.resolve';
import { JarCreatedComponent } from './components/views/jar-details/jar-created/jar-created.component';
import { JarActiveComponent } from './components/views/jar-details/jar-active/jar-active.component';
import { JarOverComponent } from './components/views/jar-details/jar-over/jar-over.component';
import { UserBoardComponent } from './components/views/dashboard/user-board/user-board.component';
import { PayComponent } from './components/views/jar-details/jar-over/pay/pay.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        PageNotFoundComponent,
        NavbarComponent,
        LoaderComponent,
        IconComponent,
        AvatarPickerComponent,
        UserProfileComponent,
        ConfirmationMessageComponent,
        ConfirmationPassComponent,
        FooterComponent,
        AdminBoardComponent,
        AssociationOfficeComponent,
        AssociationCreateComponent,
        DescriptionFormatterPipe,
        JarCreateComponent,
        MembersUpdateComponent,
        JarPreviewComponent,
        JarDetailsComponent,
        ConfessComponent,
        JarBoardComponent,
        JarCreatedComponent,
        JarActiveComponent,
        JarOverComponent,
        UserBoardComponent,
        PayComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LayoutModule,
        MaterialModule,
        AppRoutingModule
    ],
    entryComponents: [
        IconComponent,
        ConfirmationMessageComponent
    ],
    providers: [
        LoaderService,
        AnonymousGuard,
        UserGuard,
        AuthService,
        FormFactory,
        JarResolver,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Defines custom 'Module schemas' to improve Angular cohesion
    bootstrap: [AppComponent]
})
export class AppModule { }
