# Okta Sign-In Widget
      The Okta Sign-In Widget is a Javascript widget that can be used to authenticate users on any website.

# Add the Okta Sign-In Widget in your Angular Application

      1. Install the Angular CLI: npm install -g @angular/cli

      2. Create the new angular application using Angular CLI: ng new OktaApp

      3. Install the npm packages

              For Sign-In Widget: npm install @okta/okta-signin-widget --save
              For OktaAuthService: npm install @okta/okta-angular --save

      4. Create an Okta account (sign up for a free developer organization if you need one)

      5. Add the container to inject the Sign-In Widget in your template file:
              
            <div id = "okta-signin-container"></div>
            <link href="https://global.oktacdn.com/okta-signin-widget/3.1.3/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

      6. Load the Sign-In Widget module 
         import * as OktaSignIn from '@okta/okta-signin-widget';

              Use OktaSignIn
              signIn = new OktaSignIn({
                  baseUrl: 'https://{yourOktaDomain}',
                  logo: '/assets/img/image.png',
                  redirectUri: '{{redirectUri configured in OIDC app}}',
                  authParams: {
                    display: 'page'
                  }
              });

      7. Load the OKtaAuthService
         import { OktaAuthService } from '@okta/okta-angular';

              Use OKtaAuthService
              constructor(private oktaAuth : OktaAuthService) { }

      8. Renders the Okta Sign-In Widget and passes control back to your app through success and error callback
             this.signIn.renderEl(
               {el: '#okta-signin-container'},(res) => {},(err) => {});


      9. Load the configuration in your app.module.ts file 
         import { OKTA_CONFIG } from '@okta/okta-angular';

              Gather the following information from the Okta Developer Console
              Client Id - The client ID of the SPA application can be found on the "General" tab of an application.
              Issuer - This is the URL of the authorization server that will perform authentication. The issuer is a combination of your Org URL and /oauth2/default.

              const oktaConfig = {
                issuer: 'https://yourOktaDomain.com/oauth2/default',
                clientId: '0oaxxxxxxxxxxxxxx4x6',
                redirectUri: 'http://localhost:4200/implicit/callback'
              }

      10. Import the Angular Router service to specify application states and manage state transitions.
              
              RouterModule.forRoot([
                { path: '', redirectTo: 'Login', pathMatch: 'full' },
                { path: 'Login', component: LoginComponent },
                { path: 'implicit/callback', component: DashboardComponent }
            ])

      11. Add the providers for all the services in your app.module.ts file 
              providers: [OktaAuthService,
                { provide: OKTA_CONFIG, useValue: oktaConfig }
              ],
