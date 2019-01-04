export class Shelf {
    public id: number;
    public name: string;
    public icon: string;
  
    constructor (
      id: number, 
      name: string,
      icon: string
    ) {
      this.id = id;
      this.name = name;
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
  