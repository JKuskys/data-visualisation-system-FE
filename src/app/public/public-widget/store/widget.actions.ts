import { createAction, props } from '@ngrx/store';
import { IWidget } from 'src/app/shared/models';

export const resetWidget = createAction(
  '[Public widget] Reset Widget'
);

export const loadWidget = createAction(
  '[Public widget] Load Widget',
  props<{ key: string }>()
);

export const loadWidgetSuccess = createAction(
  '[Public widget] Load widget success',
  props<{ widget: IWidget }>()
);

export const loadWidgetError = createAction('[Public widget] Load widget error');

export const loadWidgets = createAction('[Public widget] Load widgets');

export const loadWidgetsSuccess = createAction(
  '[Public widget] Load widgets success',
  props<{ widgetsKeys: string[] }>()
);

export const loadWidgetsError = createAction(
  '[Public widget] Load widgets error'
);
