import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from './models';

import * as AuthenticationActions from '../store/authentication.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  isLoggingIn = true;

  constructor(private store: Store) {}

  onLogIn(user: IUser) {
    this.store.dispatch(AuthenticationActions.authenticateUser({user}))
  }

  onRegister(user: IUser) {
    this.store.dispatch(AuthenticationActions.createUser({user}))
  }
}
