import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry } from 'rxjs/operators';
import { AdalConfigService } from './adal-config.service';
import * as  AuthenticationContext from 'adal-angular';

@Injectable()
export class AdalService {
  private context: AuthenticationContext;
  constructor(private configService: AdalConfigService) {
    this.context = new AuthenticationContext(configService.adalSettings);
  }
  login() {
    this.context.login();
  }
  logout() {
    this.context.logOut();
  }
  get authContext() {
    return this.context;
  }
  handleWindowCallback() {
    this.context.handleWindowCallback();
  }
  public get userInfo() {

    return this.context.getCachedUser();
  }
  public get accessToken() {
    return this.context.getCachedToken(this.configService.adalSettings.clientId);
  }
  public get isAuthenticated() {
    return this.userInfo && this.accessToken;
  }

  public isCallback(hash: string) {
    return this.context.isCallback(hash);
  }

  public getLoginError() {
    return this.context.getLoginError();
  }

  public getAccessToken(endpoint: string, callbacks: (message: string, token: string) => any) {

    return this.context.acquireToken(endpoint, callbacks);
  }

  public acquireTokenResilient(resource: string): Observable<any> {
    return new Observable<any>((subscriber: Subscriber<any>) =>
      this.context.acquireToken(resource, (message: string, token: string) => {
        if (token) {
          subscriber.next(token);
        } else {
          subscriber.error(message);
        }
      })
    ).pipe(retry(3));
  }
}
