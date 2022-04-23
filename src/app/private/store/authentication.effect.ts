import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Api } from 'src/app/shared/models/api.enum';
import { IUser } from '../authentication/models';

import * as AuthenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.authenticateUser),
      mergeMap(({ user }) => this.authenticateUser(user))
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.createUser),
      mergeMap(({ user }) => this.createUser(user))
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  private authenticateUser(user: IUser): Observable<Action> {
    return this.http
      .post<{ access_token: string }>(`${Api.default}/login`, user)
      .pipe(
        map(({ access_token }) =>
          AuthenticationActions.authenticateUserSuccess({
            accessToken: access_token,
          })
        ),
        catchError(() => of(AuthenticationActions.authenticateUserError()))
      );
  }

  private createUser(user: IUser): Observable<Action> {
    return this.http.post(`${Api.default}/signup`, user).pipe(
      map(() => AuthenticationActions.createUserSuccess()),
      catchError(() => of(AuthenticationActions.createUserError()))
    );
  }
}
