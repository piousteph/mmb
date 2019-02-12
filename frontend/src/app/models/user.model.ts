export class User {
  public id: number;
  public user: string;
  public email: string;
  public profile: string;

  constructor (
    id: number, 
    user: string,
    email: string,
    profile: string
  ) {
    this.id = id;
    this.user = name;
    this.email = email;
    this.profile = profile;
  }
}

export class Users {
  public total: number;
  public rows: Users[];

  constructor(total: number, rows: Users[]) {
    this.total = total;
    this.rows = rows;
  }
}

export class UserLogged {
    public iat: number;
    public id: number;
    public user: string;
    public email: string;
    public profile: string;

    constructor (
      iat: number, 
      id: number, 
      user: string,
      email: string,
      profile: string
    ) {
      this.iat = iat;
      this.id = id;
      this.user = user;
      this.email = email;
      this.profile = profile;
    }
}
