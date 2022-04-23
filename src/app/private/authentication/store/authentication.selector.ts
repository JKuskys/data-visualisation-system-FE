import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './authentication.reducer';

export const getAuthenticatedUserState = createFeatureSelector<State>('authentication');

export const getIsLoadingUser = createSelector(
  getAuthenticatedUserState,
  (state: State) => state.isLoading
);

export const getAccessToken = createSelector(
  getAuthenticatedUserState,
  (state: State) => state.accessToken
);

export const getUserName = createSelector(
  getAuthenticatedUserState,
  (state: State) => state.username
);