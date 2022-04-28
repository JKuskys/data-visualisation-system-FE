import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IWidget } from 'src/app/shared/models';
import { Api } from 'src/app/shared/models/api.enum';

import * as WidgetActions from './widget.actions';

@Injectable()
export class PublicWidgetsEffects {
  loadPrivateWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.loadWidget),
      mergeMap(({ key }) => this.loadWidget(key))
    )
  );

  loadPrivateWidgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.loadWidgets),
      mergeMap(() => this.loadWidgets())
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  private loadWidgets(): Observable<Action> {
    return this.http
      .get<string[]>(`${Api.default}/widgets`)
      .pipe(
        map((widgetsKeys) => {
          return WidgetActions.loadWidgetsSuccess({
            widgetsKeys,
          });
        }),
        catchError(() => {
          return of(WidgetActions.loadWidgetsError());
        })
      );
  }

  private loadWidget(key: string): Observable<Action> {
    return this.http.get<IWidget>(`${Api.default}/widgets/${key}`).pipe(
      map((widget) => {
        return WidgetActions.loadWidgetSuccess({
          widget,
        });
      }),
      catchError(() => {
        return of(WidgetActions.loadWidgetError());
      })
    );
  }
}
