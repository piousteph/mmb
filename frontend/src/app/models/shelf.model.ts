export class Shelf {
    public shelf_id: number;
    public shelf: string;
    public icon: string;

    constructor (
      shelf_id: number,
      shelf: string,
      icon: string
    ) {
      this.shelf_id = shelf_id;
      this.shelf = shelf;
      this.icon = icon;
    }
  }

  export class Shelfs {
    public total: number;
    public rows: Shelf[];

    constructor(total: number, rows: Shelf[]) {
      this.total = total;
      this.rows = rows;
    }
  }
