import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { ICartStateItem } from '@/shared/lib/get-cart-details';
import { FormInput } from '../form-components/form-input';
import { Textarea } from '@/components/ui';

interface Props {

}

export const CheckoutAddressForm: React.FC<Props> = ({ }) => {

    return (
        <WhiteBlock title="3. Адресс доставки ">
            <div className="flex flex-col gap-5">
                <FormInput name="firstName" className="text-base" placeholder="Имя" />

                <Textarea
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};