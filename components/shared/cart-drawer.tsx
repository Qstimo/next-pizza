'use client'

import { FC, PropsWithChildren, useEffect } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/shared/store';
import { getCartDetails, getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { assert } from 'console';

interface Props {
    className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
    const [totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem] = useCartStore(state =>
        [
            state.totalAmount,
            state.items,
            state.fetchCartItems,
            state.updateItemQuantity,
            state.removeCartItem,
        ])

    const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        await updateItemQuantity(id, newQuantity)
    }

    useEffect(() => {
        fetchCartItems()
    }, [])


    return (
        <Sheet >
            <SheetTrigger asChild >{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4f1ee]'>
                <SheetHeader>
                    <SheetTitle>Товаров в корзине: <span className='font-bold'>{items.length}</span></SheetTitle>
                </SheetHeader>

                <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
                    {items.map(item => <div className='mb-2'>
                        <CartDrawerItem
                            id={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => removeCartItem(item.id)}
                            details={item.pizzaSize
                                ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize,)
                                : ''} />
                    </div>)}
                </div>

                <SheetFooter className='-mx-6 bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4 '>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого
                                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                            </span>

                            <span>{totalAmount} R</span>
                        </div>

                        <Link href='/cart' >
                            <Button
                                //  onClick={()=> setRedirecting(true)}
                                // loading = {loading || redirecting}
                                type='submit'
                                className='w-full h-12 text-base'
                            >
                                Оформить заказ
                                <ArrowRight className='w-5 ml-2' />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};