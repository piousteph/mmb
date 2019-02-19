export class User {
  public user_id: number;
  public user: string;
  public email: string;
  public profile: string;
  public profile_id: number;

  constructor (
    user_id: number,
    user: string,
    email: string,
    profile: string,
    profile_id: number
  ) {
    this.user_id = +user_id;
    this.user = user;
    this.email = email;
    this.profile = profile;
    this.profile_id = +profile_id;
  }
}

export class Users {
  public total: number;
  public rows: Users[];

  constructor(total: number, rows: Users[]) {
    this.total = +total;
    this.rows = rows;
  }
}

export class UserLogged {
    public iat: number;
    public user_id: number;
    public user: string;
    public email: string;
    public profile: string;
    public profile_id: number;

    constructor (
      iat: number,
      user_id: number,
      user: string,
      email: string,
      profile: string,
      profile_id: number
    ) {
      this.iat = iat;
      this.user_id = +user_id;
      this.user = user;
      this.email = email;
      this.profile = profile;
      this.profile_id = +profile_id;
    }
}
