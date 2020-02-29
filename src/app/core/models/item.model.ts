export const Conditions = ['New', 'Used', 'Well worn'];

export interface Item {
  name: string;
  description?: string;
  price: number;
  location?: string;
  condition: string;
  image: string;
  createdAt: Date;
}
