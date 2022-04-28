import { Action, createReducer, on } from '@ngrx/store';
import { IWidget } from 'src/app/shared/models';

import * as WidgetActions from './widget.actions';

export interface State {
  isLoading: boolean;
  widget: IWidget | null;
  widgetsKeys: string[];
}

export const initialState: State = {
  isLoading: false,
  widget: null,
  widgetsKeys: [],
};

const widgetsReducer = createReducer(
  initialState,
  on(WidgetActions.resetWidget, (state) => ({
    ...state,
    widget: null,
  })),  
  on(WidgetActions.createWidget, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(WidgetActions.createWidgetSuccess, (state, { widget }) => ({
    ...state,
    isLoading: false,
    widget
  })),
  on(WidgetActions.createWidgetError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(WidgetActions.updateWidget, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(WidgetActions.updateWidgetSuccess, (state, { widget }) => ({
    ...state,
    isLoading: false,
    widget
  })),
  on(WidgetActions.createWidgetError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(WidgetActions.loadWidget, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(WidgetActions.loadWidgetSuccess, (state, { widget }) => ({
    ...state,
    isLoading: false,
    widget
  })),
  on(WidgetActions.loadPrivateWidgetsError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(WidgetActions.loadPrivateWidgets, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(WidgetActions.loadPrivateWidgetsSuccess, (state, { widgetsKeys }) => ({
    ...state,
    isLoading: false,
    widgetsKeys
  })),
  on(WidgetActions.loadPrivateWidgetsError, (state) => ({
    ...state,
    isLoading: false,
  })),
);

export function reducer(state: State, action: Action): State {
  return widgetsReducer(state, action);
}
