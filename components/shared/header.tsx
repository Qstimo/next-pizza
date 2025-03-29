import { cn } from '@/shared/lib/utils'
import React, { FC } from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Button } from '../ui'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'

interface Props {
    className?: string
    hasSearch?: boolean
    hasCart?: boolean
}

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8 '>
                <div className='flex items-center gap-4'>
                    <Link href='/'>
                        <Image src='/logo.png' alt='logo' width={35} height={35} />
                    </Link>
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>

                {hasSearch && <div className='mx-10 flex-1'>
                    <SearchInput />
                </div>}

                <div className='flex items-center gap-3'>
                    <Button className='flex items-center gap-3' variant="outline"><User size={16} /> Войти</Button>

                    <div>
                        {hasCart && <CartButton />}
                    </div>
                </div>

            </Container>
        </header>
    )
}