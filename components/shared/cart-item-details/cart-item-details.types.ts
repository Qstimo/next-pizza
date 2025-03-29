import { Ingridient } from "@prisma/client";

export interface CartItemProps {
  id: number,
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string
  className?: string;
  disabled?: boolean

}
