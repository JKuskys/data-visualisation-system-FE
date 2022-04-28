import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './widget.reducer';

export const getWidgetsState = createFeatureSelector<State>('publicWidgets');

export const getIsLoadingUser = createSelector(
  getWidgetsState,
  (state: State) => state.isLoading
);

export const getWidget = createSelector(
  getWidgetsState,
  (state: State) => state.widget
);

export const getWidgetsKeys = createSelector(
  getWidgetsState,
  (state: State) => state.widgetsKeys
);