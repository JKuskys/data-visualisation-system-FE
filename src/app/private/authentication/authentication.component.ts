import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUser } from './models';

import * as AuthenticationActions from './store/authentication.actions';
import * as fromAuthentication from './store/authentication.selector';
import { Actions, ofType } from '@ngrx/effects';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isLoggingIn = true;
  isLoading$ = this.store.pipe(select(fromAuthentication.getIsLoadingUser));
  username$ = this.store.pipe(select(fromAuthentication.getUserName));
  isLoggedIn$ = this.store.pipe(select(fromAuthentication.getAccessToken));

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(AuthenticationActions.createUserSuccess),
        untilDestroyed(this)
      )
      .subscribe(() => (this.isLoggingIn = true));
  }

  onLogIn(user: IUser) {
    this.store.dispatch(AuthenticationActions.authenticateUser({ user }));
  }

  onRegister(user: IUser) {
    this.store.dispatch(AuthenticationActions.createUser({ user }));
  }
}
