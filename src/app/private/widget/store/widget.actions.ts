import { createAction, props } from '@ngrx/store';
import { IWidget } from 'src/app/shared/models';

export const resetWidget = createAction(
  '[Private widget] Reset Widget'
);

export const createWidget = createAction(
  '[Private widget] Create Widget',
  props<{ widget: IWidget }>()
);

export const createWidgetSuccess = createAction(
  '[Private widget] Create widget success',
  props<{ widget: IWidget }>()
);

export const createWidgetError = createAction('[Private widget] Create widget error');

export const updateWidget = createAction(
  '[Private widget] Update Widget',
  props<{ widget: IWidget }>()
);

export const updateWidgetSuccess = createAction(
  '[Private widget] Update widget success',
  props<{ widget: IWidget }>()
);

export const updateWidgetError = createAction('[Private widget] Update widget error');

export const loadWidget = createAction(
  '[Private widget] Load Widget',
  props<{ key: string }>()
);

export const loadWidgetSuccess = createAction(
  '[Private widget] Load widget success',
  props<{ widget: IWidget }>()
);

export const loadWidgetError = createAction('[Private widget] Load widget error');

export const loadPrivateWidgets = createAction('[Private widget] Load private widgets');

export const loadPrivateWidgetsSuccess = createAction(
  '[Private widget] Load private widgets success',
  props<{ widgetsKeys: string[] }>()
);

export const loadPrivateWidgetsError = createAction(
  '[Private widget] Load private widgets error'
);
