import styled from 'styled-components';
import { Select } from '../components/Select';
import { Table } from '../components/Table';

const TableStyle = styled(Table)`
  margin-top: 20px;
`;


const ExchangeRates = () => {
  return (
    <>
      <Select />
      <TableStyle />
    </>
  );
};

export default ExchangeRates;
