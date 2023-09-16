import { User } from '../models/user.model';
import { createAction, props } from '@ngrx/store';

export const AddUser = createAction(
  '[USER] Add USER',
  props<{user: User}>()
);