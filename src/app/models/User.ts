export interface IUser {
  login: string;
  password: string;
}

export class User implements IUser {
  login: string;
  password: string;
}


export class LoggedUser implements IUser {
  "id": number
  "fakeToken": string
  "name": {
    "first": string
    "last": string
  }
  "login": string
  "password": string
}