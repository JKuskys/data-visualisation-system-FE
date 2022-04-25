import { Action, createReducer, on } from '@ngrx/store';

import * as AuthenticationActions from './authentication.actions';

export interface State {
  isLoading: boolean;
  username: string;
  accessToken: string;
}

export const initialState: State = {
  isLoading: false,
  username: '',
  accessToken: '',
};

const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.logOut, () => initialState),
  on(AuthenticationActions.createUser, (state, { user }) => ({
    ...state,
    isLoading: true,
    username: user.username,
    accessToken: '',
  })),
  on(AuthenticationActions.createUserSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AuthenticationActions.createUserError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AuthenticationActions.authenticateUser, (state, { user }) => ({
    ...state,
    isLoading: true,
    username: user.username,
    accessToken: '',
  })),
  on(
    AuthenticationActions.authenticateUserSuccess,
    (state, { accessToken }) => ({
      ...state,
      isLoading: false,
      accessToken,
    })
  ),
  on(AuthenticationActions.authenticateUserError, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducer(state: State, action: Action): State {
  return authenticationReducer(state, action);
}
