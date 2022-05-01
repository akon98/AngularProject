export interface UserInterface {
    id?: number;
    login: string;
    password: string;
  }
  export class User implements UserInterface {
    id?: number;
    login: string;
    password: string;
    constructor(login: string, password: string, id?: number) {
      this.id = id;
      this.login = login;
      this.password = password;
    }
  }
  /*
export interface UserInterface {
    id: number;
    login: string;
    password: string;
  }
  export class User implements UserInterface {
    id: number;
    login: string;
    password: string;
    constructor(id: number, login: string, password: string) {
      this.id = id;
      this.login = login;
      this.password = password;
    }
  }
  */