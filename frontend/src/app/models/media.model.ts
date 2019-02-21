export class Media {
  public item_id: number;
  public name: string;
  public inferno: boolean;
  public date_created: Date;
  public date_lend: Date;

  constructor(
    item_id: number,
    name: string,
    inferno: boolean,
    date_created: Date,
    date_lend: Date
    ) {
    this.item_id = item_id;
    this.name = name;
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
