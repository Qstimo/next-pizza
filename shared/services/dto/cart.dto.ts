import { pizzaSizes } from './../../constants/pizza';
import { Cart, CartItem, Ingridient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product,
    }
    ingridients: Ingridient[]
}

export interface CartDTO extends Cart {
    items: CartItemDTO[],
    totalAmount: number
}

export interface CreateCartItemValue {
    productItemId: number
    ingridients?: number[]
    quantity: number
}