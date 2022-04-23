import { createAction, props } from '@ngrx/store';
import { IUser } from '../authentication/models';

export const updateUsername = createAction(
  '[Private widgets] Update username',
  props<{ username: string }>()
);

export const authenticateUser = createAction(
  '[Private widgets] Authenticate user',
  props<{user: IUser}>()
);

export const authenticateUserSuccess = createAction(
  '[Private widgets] Authenticate user success',
  props<{ accessToken: string }>()
);

export const authenticateUserError = createAction(
  '[Private widgets] Authenticate user error'
);

export const createUser = createAction(
  '[Private widgets] Create user',
  props<{user: IUser}>()
);

export const createUserSuccess = createAction(
  '[Private widgets] Create user success'
);

export const createUserError = createAction(
  '[Private widgets] Create user error'
);

export const loadContract = createAction(
  '[Private widgets] Load widgets',
  props<{ username: string }>()
);
