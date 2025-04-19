import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { ICartStateItem } from '@/shared/lib/get-cart-details';
import { FormInput } from '../form-components/form-input';

interface Props {
    
}

export const CheckoutPersonalForm: React.FC<Props> = ({  }) => {

    return (
        <WhiteBlock title="2. Персональные данные ">
        <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" className="text-base" placeholder="Имя" />
            <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
            <FormInput name="email" className="text-base" placeholder="E-Mail" />
            <FormInput name="phone" className="text-base" placeholder="Телефон" />
        </div>
    </WhiteBlock>
    );
};