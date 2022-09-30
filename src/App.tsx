import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import { useAppDispatch } from './hooks/redux';
import Converter from './pages/Converter';
import ExchangeRates from './pages/ExchangeRates';
import { fetchRates } from './store/slices/rates';

const Main = styled.main`
  width: ${({ theme }) => theme.containerWidth};
  margin: 70px auto 0 auto;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRates());
  }, []);
  
  return (
    <>
      <Header />
      <Main>
        <Page>
          <Routes>
            <Route path="/" element={<Converter />} />
            <Route path="/converter" element={<ExchangeRates />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Page>
      </Main>
    </>
  );
};

export default App;
