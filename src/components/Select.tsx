import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button } from './Button';

import styled from 'styled-components';
import { setMain } from '../store/slices/rates';
import { Input } from './Input';

const SelectStyle = styled.div`
  position: relative;
`;

const Options = styled.ul`
  padding: 8px 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  border-radius: 20px;
  background: ${({ theme }) => theme.gray};
  position: absolute;
  height: 200px;
  overflow-y: auto;
  left: 50%;
  text-align: center;
  top: calc(100% + 5px);
  transform: translateX(-50%);
`;

const Option = styled.li`
  padding: 8px 20px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.darkGray};
  }
`;

const ButtonUp = styled(Button)`
  text-transform: uppercase;
`;

export const Select: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data, main } = useAppSelector((state) => state.rates);
  const dispatch = useAppDispatch();

  return (
    <SelectStyle>
      <ButtonUp onClick={() => setIsOpen(!isOpen)}>{main}</ButtonUp>
      {isOpen && (
        <Options>
          <Input placeholder='Enter currency' onChange={(e) => setSearch(e.target.value)} value={search}/>
          {Object.keys(data.rates).filter((cur) => cur.includes(search.toUpperCase())).map((cur) => (
            <Option
              onClick={() => {
                setIsOpen(false);
                setSearch('');
                dispatch(setMain(cur));
              }}
              key={cur}>
              <p>{cur}</p>
            </Option>
          ))}
        </Options>
      )}
    </SelectStyle>
  );
};
