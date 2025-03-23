import { getCartDetails } from '@/shared/lib';
import { create } from "zustand"
import { Api } from "../services/api-client"
import { ICartStateItem } from "../lib/get-cart-details"
import { CreateCartItemValue } from '../services/dto/cart.dto';



export interface CartState {
    loading: boolean
    error: boolean
    totalAmount: number
    items: ICartStateItem[]

    fetchCartItems: () => Promise<void>
    updateItemQuantity: (id: number, quantity: number) => Promise<void>
    addCartItem: (values: any) => Promise<void>
    removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,


    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.fetchCart()
            const items = getCartDetails(data)
            set(items)
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.removeCartItem(id)
            const items = getCartDetails(data)
            set(items)
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.updateItemQuantity(id, quantity)
            const items = getCartDetails(data)
            set(items)
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    addCartItem: async (value: CreateCartItemValue) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.addCartItem(value)
            const items = getCartDetails(data)
            set(items)
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    }
}))