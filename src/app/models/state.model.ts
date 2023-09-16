import { User } from '../models/user.model';

export interface State {
  readonly users: Array<User>;
}