import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../resources/material.module';


import { ViewsComponents } from './components/views';
import { SharedComponents, SharedServices, SharedEntriesComponents } from './components/shared';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthModule } from './services/security';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ...ViewsComponents,
    ...SharedComponents
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
    ...SharedEntriesComponents
  ],
  providers: [
    ...SharedServices,
    ...AuthModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent]
})
export class AppModule { }
