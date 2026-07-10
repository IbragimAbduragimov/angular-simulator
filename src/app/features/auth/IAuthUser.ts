import { Role } from './Role.enum';

export interface IAuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: Role;
}
