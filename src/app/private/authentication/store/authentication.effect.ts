import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Api } from 'src/app/shared/models/api.enum';
import { IUser } from '../models';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  private authenticateUser(user: IUser): Observable<Action> {
    return this.http
      .post<{ access_token: string }>(`${Api.default}/auth/login`, user)
      .pipe(
        map(({ access_token }) => {
          this.toastr.success('Prisijungimas sekmingas');
          return AuthenticationActions.authenticateUserSuccess({
            accessToken: access_token,
          });
        }),
        catchError(() => {
          this.toastr.error('Neteisingi prisijungimo duomenys');
          return of(AuthenticationActions.authenticateUserError());
        })
      );
  }

  private createUser(user: IUser): Observable<Action> {
    return this.http.post(`${Api.default}/auth/signup`, user).pipe(
      map(() => {
        this.toastr.success('Registracija sekmingas');
        return AuthenticationActions.createUserSuccess();
      }),
      catchError(() => {
        this.toastr.error('Registracija nepavyko');
        return of(AuthenticationActions.createUserError());
      })
    );
  }
}
