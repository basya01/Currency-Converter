import { KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { useAppSelector } from '../hooks/redux';
import { calcRate } from '../utils/calcRate';

const InputStyle = styled(Input)`
  width: 500px;
  padding: 30px 50px;
  font-size: 24px;
  border-radius: 30px;
`;

const ResultLabel = styled.p`
  margin-top: 50px;
  font-size: 30px;
`;

const Result = styled.p`
  font-size: 100px;
  color: ${({ theme }) => theme.darkBlue};
`;

const Converter = () => {
  const [result, setResult] = useState<{ cur: string; value: number } | null>();
  const { rates } = useAppSelector((state) => state.rates.data);

  const inputKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!(e.code === 'Enter')) return;

    setResult(calcRate((e.target as HTMLInputElement).value, rates));
  };

  return (
    <>
      <InputStyle onKeyDown={inputKeyHandler} placeholder='Example: "15 usd" in "uah"' />
      {result !== undefined && (
        <>
          <ResultLabel>Result: </ResultLabel>
          <Result>
            {result
              ? `${Math.round(result.value * 1000) / 1000} ${result.cur.toUpperCase()}`
              : 'Error'}
          </Result>
        </>
      )}
    </>
  );
};

export default Converter;
