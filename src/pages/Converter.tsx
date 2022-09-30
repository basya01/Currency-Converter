import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { useAppSelector } from '../hooks/redux';
import { Status } from '../store/slices/rates';
import { calcRate } from '../utils/calcRate';

const InputStyle = styled(Input)`
  width: 500px;
  padding: 30px 50px;
  font-size: 24px;
  border-radius: 30px;
`;

const ResultsBlock = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const ResultLabel = styled.p`
  font-size: 30px;
`;

const Result = styled.p`
  font-size: 100px;
  color: ${({ theme }) => theme.darkBlue};
`;

const Converter = () => {
  const [result, setResult] = useState<{ cur: string; value: number } | null>(null);
  const [value, setValue] = useState('"15 usd" in "uah"');
  const { data, status } = useAppSelector((state) => state.rates);

  const inputKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!(e.code === 'Enter')) return;

    setResult(calcRate(value, data.rates));
  };

  useEffect(() => {
    setResult(calcRate(value, data.rates));
  }, [data.rates]);

  return (
    <>
      <InputStyle
        onKeyDown={inputKeyHandler}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder='Example: "15 usd" in "uah"'
      />
      <ResultsBlock>
        {status === Status.PENDING ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <ResultLabel>Result: </ResultLabel>
            <Result>
              {result
                ? `${Math.round(result.value * 1000) / 1000} ${result.cur.toUpperCase()}`
                : 'Error'}
            </Result>
          </>
        )}
      </ResultsBlock>
    </>
  );
};

export default Converter;
