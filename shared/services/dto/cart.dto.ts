import { Cart, CartItem, Ingridient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product,
    }
    ingredients:Ingridient[]
}

export interface CartDTO extends Cart {
    items: CartItemDTO[],
    totalAmount: number
}