import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { ICartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
    className?: string;
    items: ICartStateItem[]
    updateItemQuantity: (id: number, quantity: number) => void
    removeCartItem: (id: number) => void
}

export const CheckoutCart: React.FC<Props> = ({ items,
    updateItemQuantity,
    removeCartItem }) => {


    const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        await updateItemQuantity(id, newQuantity)
    }
    return (
        <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">

                {items.map(item => <CheckoutItem
                    id={item.id}
                    key={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    details={item.pizzaSize
                        ? getCartItemDetails(item.ingridients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize,)
                        : ''}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                />)}
            </div>

        </WhiteBlock>
    );
};