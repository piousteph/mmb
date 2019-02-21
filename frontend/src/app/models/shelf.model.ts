export class Shelf {
  public shelf_id: number;
  public shelf: string;
  public icon: string;

  constructor(
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

export const shelfIconsList = [
  { value: 'eva eva-book-open', title: 'book-open' },
  { value: 'eva eva-book-open-outline', title: 'book-open 2' },
  { value: 'eva eva-book', title: 'book' },
  { value: 'eva eva-book-outline', title: 'book 2' },
  { value: 'eva eva-star', title: 'start' },
  { value: 'eva eva-star-outline', title: 'start 2' },
  { value: 'eva eva-film', title: 'film' },
  { value: 'eva eva-film-outline', title: 'film 2' },
  { value: 'eva eva-video', title: 'video' },
  { value: 'eva eva-video-outline', title: 'video 2' },
  { value: 'eva eva-folder', title: 'folder' },
  { value: 'eva eva-folder-outline', title: 'folder 2' },
  { value: 'eva eva-tv', title: 'tv' },
  { value: 'eva eva-tv-outline', title: 'tv 2' },
  { value: 'eva eva-speaker', title: 'speaker' },
  { value: 'eva eva-speaker-outline', title: 'speaker 2' },
  { value: 'eva eva-headphones', title: 'headphones' },
  { value: 'eva eva-headphones-outline', title: 'headphones 2' },
  { value: 'eva eva-cube', title: 'cube' },
  { value: 'eva eva-cube-outline', title: 'cube 2' },
  { value: 'eva eva-camera', title: 'camera' },
  { value: 'eva eva-camera-outline', title: 'camera 2' },
  { value: 'eva eva-music', title: 'music' },
  { value: 'eva eva-music-outline', title: 'music 2' }
];
