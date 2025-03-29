

import { CartDTO } from "../services/dto/cart.dto";
import { CartState } from "../store";
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
  disabled: boolean
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
    disabled: false,
    pizzaType: item.productItem.pizzaType,
    ingridients: item.ingridients?.map((ingredient)=>({
      name:ingredient.name,
      price: ingredient.price
    })) || []
  }) ) as ICartStateItem[]

  return {
    totalAmount: data.totalAmount,
    items,
  }
};
