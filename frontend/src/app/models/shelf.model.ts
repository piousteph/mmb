export class Shelf {
    public usid: number;
    public shelf: string;
    public icon: string;
  
    constructor (
      usid: number, 
      shelf: string,
      icon: string
    ) {
      this.usid = usid;
      this.shelf = name;
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
  