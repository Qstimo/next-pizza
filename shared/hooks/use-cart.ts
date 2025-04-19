import { addCartItem } from './../services/cart';
import { useEffect } from "react"
import { useCartStore } from "../store"
import { ICartStateItem } from "../lib/get-cart-details"
import { CreateCartItemValue } from '../services/dto/cart.dto';

type ReturnProps ={
    totalAmount:number
    items:ICartStateItem[]
    loading: boolean
    updateItemQuantity:(id:number, quantity: number)=> void
    removeCartItem:(id: number)=> void
    addCartItem: (valuses: CreateCartItemValue) => void
}
export const useCart = ():ReturnProps => {
    const [totalAmount, items, fetchCartItems, addCartItem, updateItemQuantity, removeCartItem, loading] = useCartStore(state =>
        [
            state.totalAmount,
            state.items,
            state.fetchCartItems,
            state.addCartItem,
            state.updateItemQuantity,
            state.removeCartItem,
            state.loading
        ])


    useEffect(() => {
        fetchCartItems()
    }, [])

    return {
        totalAmount,
        items,
        updateItemQuantity,
        addCartItem,
        removeCartItem,
        loading
    }
}