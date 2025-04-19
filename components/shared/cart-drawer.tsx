'use client'

import { FC, PropsWithChildren, useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';

import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import Image from 'next/image';
import { Title } from './title';
import clsx from 'clsx';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';

interface Props {
    className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
    const {
        totalAmount,
        items,
        updateItemQuantity,
        removeCartItem,
    } = useCart()

    const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        await updateItemQuantity(id, newQuantity)
    }

    const [redirecting, setRedirecting] = useState(false)


    return (
        <Sheet >
            <SheetTrigger asChild >{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4f1ee]'>

                <div className={clsx('flex flex-col h-full', !totalAmount && 'justify-center')}>

                    {totalAmount > 0 && <SheetHeader>
                        <SheetTitle>Товаров в корзине: <span className='font-bold'>{items.length}</span></SheetTitle>
                    </SheetHeader>}

                    {!totalAmount && (
                        <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                            <Image src='/assets/images/empty-box.png' alt='empty-cart' width='120' height='120' />
                            <Title size='sm' text='Корзина пустая' className='text=center font-bold my-2' />
                            <p className='text-center text-neutral-500 mb-5'>
                                Добавьте товары, чтобы совершить заказ!
                            </p>

                            <SheetClose>
                                <Button className='w-56 h-12 text-base' size='lg'>
                                    <ArrowLeft className='w-5 mr-2' />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {
                        totalAmount > 0 && <>
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
                                        disabled={item.disabled}
                                        details={item.pizzaSize
                                            ? getCartItemDetails(item.ingridients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize,)
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

                                    <Link href='/checkout' >
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            type='submit'
                                            className='w-full h-12 text-base'
                                        >
                                            Оформить заказ
                                            <ArrowRight className='w-5 ml-2' />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    }
                </div>
            </SheetContent>
        </Sheet>
    );
};