import { ECategory } from "../domain/useCases/Products/ProductDTO";

export interface IProduct {
  _id?: string;
  name: string;
  category: ECategory;
  description?: string;
  price: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
  