'use client'

import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngedients } from '@/hooks/useFilterIngedients';
import { useSearchParam, useSet } from 'react-use';
import QueryString from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    className?: string;
}
interface PriceProps {
    priceFrom?: number,
    priceTo?: number
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string,
    sizes: string,
    selectedIds: string
}
export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
    const router = useRouter()

    const [{ priceFrom, priceTo }, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []))
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))

    const onChangeSetPrice = (name: keyof PriceProps, value: number) => {
        setPrice(prev => ({ ...prev, [name]: value }))
    }

    const { ingridients, loading, onAddId, selectedIds, } = useFilterIngedients(searchParams.get('selectedIds') ? searchParams.get('selectedIds')?.split(',') : [])

    const items = ingridients.map((item) => ({ value: String(item.id), text: item.name }))

    useEffect(() => {
        const filtres = {
            priceFrom,
            priceTo,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingridients: Array.from(selectedIds),
        }

        const query = QueryString.stringify(filtres, {
            arrayFormat: 'comma'
        })

        router.push(`?${query}`, { scroll: false })

    }, [priceFrom, priceTo, pizzaTypes, sizes, selectedIds])


    return (
        <div className={className}>
            <Title text="Фильтрация" size='sm' className='mb-5 font-bold' />

            <CheckboxFiltersGroup
                title='Тесто'
                className='mt-5'
                loading={loading}
                onClickCheckbox={togglePizzaTypes}
                name='size'
                selectedIds={pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                title='Размеры'
                className='mt-5'
                loading={loading}
                onClickCheckbox={toggleSizes}
                name='size'
                selectedIds={sizes}
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
                        onChange={e => onChangeSetPrice('priceFrom', Number(e.target.value))}
                        type='number'
                        placeholder='0'
                        min={0}
                        max={1000}
                        value={String(priceFrom)} />
                    <Input
                        type='number'
                        placeholder='1000'
                        min={100}
                        max={1000}
                        value={String(priceTo)}
                        onChange={e => onChangeSetPrice('priceTo', Number(e.target.value))}

                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        priceFrom || 0,
                        priceTo || 1000
                    ]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
            </div>
            <CheckboxFiltersGroup
                title='Ингридиенты'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}
                name='ingredients'
            />
        </div>
    );
};