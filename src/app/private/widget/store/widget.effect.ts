import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Api } from 'src/app/shared/models/api.enum';
import { IWidget } from '../models';
import { ToastrService } from 'ngx-toastr';

import * as WidgetActions from './widget.actions';
import { getAccessToken, getUserName } from '../../authentication/store/authentication.selector';

@Injectable()
export class WidgetsEffects {
  createWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.createWidget),
      withLatestFrom(this.store.pipe(select(getUserName))),
      mergeMap(([{ widget }, author]) =>
        this.createWidget(this.cleanUpWidgetBody(widget), author)
      )
    )
  );

  updateWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.updateWidget),
      withLatestFrom(this.store.pipe(select(getAccessToken))),
      mergeMap(([{ widget }, token]) =>
        this.updateWidget(this.cleanUpWidgetBody(widget), token)
      )
    )
  );

  loadPrivateWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.loadWidget),
      mergeMap(({ key }) => this.loadPrivateWidget(key))
    )
  );

  loadPrivateWidgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetActions.loadPrivateWidgets),
      withLatestFrom(this.store.pipe(select(getUserName))),
      mergeMap(([{}, author]) => this.loadPrivateWidgets(author))
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toastr: ToastrService,
    private store: Store
  ) {}

  private updateWidget(widget: IWidget, token: string): Observable<Action> {
    return this.http
      .put<IWidget>(`${Api.default}/widgets/${widget.id}`, widget, {headers: {'Authorization': `Bearer ${token}`}})
      .pipe(
        map(() => {
          this.toastr.success('Sekmingai atnaujintas duomenų valdiklis');
          return WidgetActions.updateWidgetSuccess({
            widget,
          });
        }),
        catchError(() => {
          this.toastr.error('Nepavyko atnaujinti duomenų valdiklio');
          return of(WidgetActions.updateWidgetError());
        })
      );
  }

  private createWidget(widget: IWidget, author: string): Observable<Action> {
    return this.http
      .post<IWidget>(`${Api.default}/widgets`, { ...widget, author })
      .pipe(
        map((widget) => {
          this.toastr.success('Sekmingai sukurtas duomenų valdiklis');
          return WidgetActions.createWidgetSuccess({
            widget,
          });
        }),
        catchError(() => {
          this.toastr.error('Nepavyko sukurti duomenų valdiklio');
          return of(WidgetActions.createWidgetError());
        })
      );
  }

  private loadPrivateWidgets(author: string): Observable<Action> {
    return this.http
      .get<string[]>(`${Api.default}/widgets/private/${author}`)
      .pipe(
        map((widgetsKeys) => {
          return WidgetActions.loadPrivateWidgetsSuccess({
            widgetsKeys,
          });
        }),
        catchError(() => {
          return of(WidgetActions.loadPrivateWidgetsError());
        })
      );
  }

  private loadPrivateWidget(key: string): Observable<Action> {
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

  private cleanUpWidgetBody(widget: IWidget) {
    let cleansedWidgetBody: IWidget = { ...widget };

    if (!cleansedWidgetBody.id) {
      delete cleansedWidgetBody.id;
    }

    if (!cleansedWidgetBody.customAttribute) {
      cleansedWidgetBody.customAttribute = undefined;
    }

    if (!cleansedWidgetBody.customLabel) {
      cleansedWidgetBody.customLabel = undefined;
    }

    if (!cleansedWidgetBody.customMax) {
      cleansedWidgetBody.customMax = undefined;
    }

    if (!cleansedWidgetBody.customMin) {
      cleansedWidgetBody.customMin = undefined;
    }

    if (!cleansedWidgetBody.customValue) {
      cleansedWidgetBody.customValue = undefined;
    }

    if (!cleansedWidgetBody.headers?.length) {
      cleansedWidgetBody.headers = undefined;
    }

    return cleansedWidgetBody;
  }
}
