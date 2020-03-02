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

export interface ItemFilter {
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  conditions?: string[];
  offset: string;
  limit: string;
}
