export class Shelf {
    public id: number;
    public name: string;
  
    constructor (
      id: number, 
      name: string
    ) {
      this.id = id;
      this.name = name;
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
  