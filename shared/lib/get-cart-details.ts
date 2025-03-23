

import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

export interface ICartStateItem {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  ingridients: Array<{ name: string, price: number }>
  pizzaSize?: number | null
  pizzaType?: number | null
}

type ReturnProps = {
  items: ICartStateItem[];
  totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {

  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalAmount(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingridients: item.ingridients?.map((ingredient)=>({
      name:ingredient.name,
      price: ingredient.price
    })) || []
  }))

  return {
    totalAmount: data.totalAmount,
    items,
  }
};
