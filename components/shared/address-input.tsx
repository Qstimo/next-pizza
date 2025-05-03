'use client'

import  { FC } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: FC<Props> = ({ onChange }) => {
  return <AddressSuggestions token="c3a8e9768379bfe61798823add0964f51533c801" onChange={(data) => onChange?.(data?.value)} />;
};
