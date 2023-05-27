import { LoginCredentials } from './login.model';

export interface RegisterCredentials extends LoginCredentials {
  firstname: string;
  lastname: string;
}
