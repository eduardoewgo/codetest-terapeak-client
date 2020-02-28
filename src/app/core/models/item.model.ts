export enum CONDITION {
  'New', 'Used', 'Well worn'
}

export interface Item {
  name: string;
  description?: string;
  price: number;
  location?: string;
  condition: CONDITION;
  image: string;
  createdAt: Date;
}
