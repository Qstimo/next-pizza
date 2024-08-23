'use client'

import React, { useEffect } from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

import QueryString from 'qs';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';


interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingridients, loading } = useIngredients()
    const filters = useFilters()
    useQueryFilters(filters)


    const items = ingridients.map((item) => ({ value: String(item.id), text: item.name }))

    const updatePrices = (prices: number[]) => {
        filters.setPrice('priceFrom', prices[0])
        filters.setPrice('priceTo', prices[1])
    }

    return (
        <div className={className}>
            <Title text="Фильтрация" size='sm' className='mb-5 font-bold' />

            <CheckboxFiltersGroup
                title='Тесто'
                className='mt-5'
                loading={loading}
                onClickCheckbox={filters.setPizzaTypes}
                name='size'
                selectedIds={filters.pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                title='Размеры'
                className='mt-5'
                loading={loading}
                onClickCheckbox={filters.setPizzaSizes}
                name='size'
                selectedIds={filters.sizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            <div className="mt-10 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className='flex gap-3 mb-5' >
                    <Input
                        onChange={e => filters.setPrice('priceFrom', Number(e.target.value))}
                        type='number'
                        placeholder='0'
                        min={0}
                        max={1000}
                        value={String(filters.prices.priceFrom)} />
                    <Input
                        type='number'
                        placeholder='1000'
                        min={100}
                        max={1000}
                        value={String(filters.prices.priceTo)}
                        onChange={e => filters.setPrice('priceTo',Number(e.target.value))}

                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 1000
                    ]}
                    onValueChange={updatePrices}
                />
            </div>
            <CheckboxFiltersGroup
                title='Ингридиенты'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selectedIds={filters.selectedIngredients}
                name='ingredients'
            />
        </div>
    );
};