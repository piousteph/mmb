export class User {
  public id: number;
  public name: string;
  public profile: string;

  constructor (
    id: number, 
    name: string,
    profile: string
  ) {
    this.id = id;
    this.name = name;
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
    public name: string;
    public profile: string;

    constructor (
      iat: number, 
      id: number, 
      name: string,
      profile: string
    ) {
      this.iat = iat;
      this.id = id;
      this.name = name;
      this.profile = profile;
    }
}
