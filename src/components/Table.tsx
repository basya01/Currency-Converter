import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/redux';

interface TableProps {
  className?: string;
}

const TableStyle = styled.table`
  border-collapse: collapse;

  thead {
    background: ${({ theme }) => theme.brightBlue};
  }

  tr {
    border-bottom: ${({ theme }) => theme.tableBorder};

    &:last-child {
      border-bottom: none;
    }

    td,
    th {
      text-align: center;
      width: 500px;
      padding: 7px 0;
    }

    td:nth-child(odd) {
      border-right: ${({ theme }) => theme.tableBorder};
    }

    th {
      color: ${({ theme }) => theme.white};
    }
  }
`;

export const Table: FC<TableProps> = ({ className }) => {
  const { data, main } = useAppSelector((state) => state.rates);

  return (
    <TableStyle className={className}>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.rates).map((cur) => (
          <tr key={cur}>
            <td>{cur}</td>
            <td>{+data.rates[cur] / +data.rates[main]}</td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
};
