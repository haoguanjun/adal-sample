
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG } from './app.config';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';

import { AccessdeniedModule } from './accessdenied/accessdenied.module';
import { FrameRedirectModule } from './frameredirect/frameredirect.module';

import { ValuesModule } from './values/values.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ValuesModule,
    AboutModule,
    AccessdeniedModule,
    FrameRedirectModule
  ],
  providers: [
    {
      provide: APP_CONFIG, useValue: {
        apiEndpoint: 'https://localhost:44340',             // WebAPI endpoint for Values
        clientId: '48bdefa0-6517-4613-ba74-b955bc339c85',   // ClientID from AAD Client-App
        tenantId: '5d2b7986-133b-45d8-b36b-3134a02925bf',   // AAD TenantID
        resource: 'bc2a6a57-38a3-4d46-bca9-56612aeba011',   // ClientID from AAD Server-App
        redirectUri: 'http://localhost:4200/frameredirect', // AAD Client-App's RedirectUri
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
