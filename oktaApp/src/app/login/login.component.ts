import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  template: `
  <!-- Container to inject the Sign-In Widget -->
  <br>
  <link href="https://global.oktacdn.com/okta-signin-widget/3.1.3/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
  <div id="okta-signin-container">
  </div>
`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn = new OktaSignIn({
    baseUrl: 'https://dev-656972.okta.com',
    logo: '/assets/img/jdlogo.png',
    authParams: {
      // pkce: true
      display: 'page'
    }
  });

  constructor(private oktaAuth : OktaAuthService) { }

  ngOnInit() {
    this.signIn.renderEl({
      el: '#okta-signin-container'
    },
      (res) => {
        if (res.status === 'SUCCESS') {
          console.log(res);
          console.log('Success')
          console.log(res.session.token);
          this.oktaAuth.loginRedirect('./Dashboard', { sessionToken: res.session.token });
        }
        else
          console.log('Failed')
      }
      , (err) => {
        throw err
      }
    );
  }
}
