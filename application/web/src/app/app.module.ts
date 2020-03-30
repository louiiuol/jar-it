import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  AuthModule } from './services';
import { AppRoutingModule } from './services/security/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../ressources';

import { AppComponent } from './components/app.component';
import { ViewComponents } from './components/views';
import { SharedComponents, SharedServices, SharedEntriesComponents } from './components/shared';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ...ViewComponents,
    ...SharedComponents,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    AppRoutingModule // AppRoutingModule is last: it comes after all the other Modules.
  ],
  entryComponents: [
    ...SharedEntriesComponents
  ],
  providers: [
    ...SharedServices,
    ...AuthModule,
  ],
  bootstrap: [ AppComponent ]
}) export class AppModule {}
