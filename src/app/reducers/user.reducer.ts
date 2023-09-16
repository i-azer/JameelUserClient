import { User } from '../models/user.model';
import { AddUser } from '../actions/user.action';
import { createReducer, on } from '@ngrx/store';

const initialState: Array<User> = [
  {
    firstName: 'First Name',
    lastName:'Last Name',
    dateOfBirth: 'Date Of Birth',
    phoneNumber:'Phone Number',
    address:'Address'
  },
];


export const UserReducer = createReducer(
  initialState,
  on(AddUser, (state, { user }) => [...state,user]));