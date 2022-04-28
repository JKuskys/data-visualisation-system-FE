import { Action, createReducer, on } from '@ngrx/store';
import { IWidget } from 'src/app/shared/models';

import * as PublicWidgetActions from './widget.actions';

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

const publicWidgetsReducer = createReducer(
  initialState,
  on(PublicWidgetActions.resetWidget, (state) => ({
    ...state,
    widget: null,
  })),  
  on(PublicWidgetActions.loadWidget, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PublicWidgetActions.loadWidgetSuccess, (state, { widget }) => ({
    ...state,
    isLoading: false,
    widget,
  })),
  on(PublicWidgetActions.loadWidgetError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PublicWidgetActions.loadWidgets, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PublicWidgetActions.loadWidgetsSuccess, (state, { widgetsKeys }) => ({
    ...state,
    isLoading: false,
    widgetsKeys,
  })),
  on(PublicWidgetActions.loadWidgetsError, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducer(state: State, action: Action): State {
  return publicWidgetsReducer(state, action);
}
