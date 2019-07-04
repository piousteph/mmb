export class Media {
  public media_id: number;
  public name: string;
  public extra: string;
  public inferno: boolean;
  public date_created: Date;
  public date_lend: Date;

  constructor(
    media_id: number,
    name: string,
    extra: string,
    inferno: boolean,
    date_created: Date,
    date_lend: Date
    ) {
    this.media_id = media_id;
    this.name = name;
    this.extra = extra;
    this.inferno = inferno;
    this.date_created = date_created;
    this.date_lend = date_lend;
  }
}

export class Medias {
  public total: number;
  public rows: Media[];

  constructor(total: number, rows: Media[]) {
    this.total = total;
    this.rows = rows;
  }
}
