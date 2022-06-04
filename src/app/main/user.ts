export interface UserInterface {
    id?: number;
    login: string;
    password: string;
    isAdmin?: boolean;
  }
  export class User implements UserInterface {
    id?: number;
    login: string;
    password: string;
    isAdmin?: boolean;
    constructor(login: string, password: string, id?: number, isAdmin?: boolean) {
      this.id = id;
      this.login = login;
      this.password = password;
      this.isAdmin = isAdmin;
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