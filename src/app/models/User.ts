export interface IUser {
  id: number;
  login: string;
  password: string;
}

export class User implements IUser {
  id: number;
  login: string;
  password: string;
}
