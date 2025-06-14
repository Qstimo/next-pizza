import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components/form-input';
import { FormTextarea } from '../form-components/form-textarea';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {

    const { control } = useFormContext()

    return (
        <WhiteBlock title="3. Адресс доставки " className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name='address'
                    render={({ field, fieldState }) => <>
                        <AdressInput onChange={field.onChange} />
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                    </>}
                />

                <FormTextarea
                    name='comment'
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};