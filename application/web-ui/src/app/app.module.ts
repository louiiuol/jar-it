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
import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, PageNotFoundComponent } from './components/views';
import { NavbarComponent, IconComponent } from './components/shared';
import { LoaderComponent, LoaderService } from './services/loader';
import { AnonymousGuard, UserGuard } from './services/security/guards';
import { AuthService } from './services/security/auth/auth.service';
import { FormFactory } from './services/forms/form.factory';
import { TokenInterceptor } from './services/security/token/token.interceptor';
import { AvatarPickerComponent } from './components/shared/avatar-picker/avatar-picker.component';

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
    IconComponent
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
