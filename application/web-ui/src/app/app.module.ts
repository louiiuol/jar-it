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
        DescriptionFormatterPipe
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
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Defines custom 'Module schemas' to improve Angular cohesion
    bootstrap: [AppComponent]
})
export class AppModule { }
