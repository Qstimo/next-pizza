import { CartItemDTO } from '../services/dto/cart.dto';



export const calcCartItemTotalAmount = (item: CartItemDTO): number => {
  const totalIngredients = item?.ingridients?.reduce((acc, ingredient) => acc + ingredient.price, 0) || 0
  return (
    (item.productItem.price + totalIngredients) * item.quantity
  );
};
