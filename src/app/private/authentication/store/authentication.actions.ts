import { createAction, props } from '@ngrx/store';
import { IUser } from '../models';

export const authenticateUser = createAction(
  '[Authentication] Authenticate user',
  props<{ user: IUser }>()
);

export const authenticateUserSuccess = createAction(
  '[Authentication] Authenticate user success',
  props<{ accessToken: string }>()
);

export const authenticateUserError = createAction(
  '[Authentication] Authenticate user error'
);

export const createUser = createAction(
  '[Authentication] Create user',
  props<{ user: IUser }>()
);

export const createUserSuccess = createAction(
  '[Authentication] Create user success'
);

export const createUserError = createAction(
  '[Authentication] Create user error'
);

export const logOut = createAction('[Authentication] Log out');
