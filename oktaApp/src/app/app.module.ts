import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthService, OKTA_CONFIG } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const oktaConfig = {
  issuer: 'https://dev-656972.okta.com/oauth2/ausfljdssZHbEjn8H4x6',
  clientId: '0oafby98ayEhLk6284x6',
  redirectUri: 'http://localhost:4200/implicit/callback'
}

const CALLBACK_PATH = 'implicit/callback';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: CALLBACK_PATH, component: DashboardComponent }
  ])
  ],
  providers: [OktaAuthService,
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
