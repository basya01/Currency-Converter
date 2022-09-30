import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
`;

const HeaderStyle = styled.header`
  background: ${({ theme }) => theme.brightBlue};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Nav = styled.nav`
  margin-left: 200px;
  ul {
    font-size: 20px;
    display: flex;
    .active {
      background: ${({ theme }) => theme.darkBlue};
      color: ${({ theme }) => theme.white};
    }
  }
`;

const Item = styled.li`
  padding: 25px 40px;
`;

const Logo = styled.h1`
  font-size: 32px;
`;

const Header = () => {
  const items = [
    {
      id: 0,
      name: 'Converter',
      to: '/',
    },
    {
      id: 1,
      name: 'Exchange Rates',
      to: '/converter',
    },
  ];

  const isHome = useLocation().pathname === '/';
  const [page, setPage] = useState(isHome ? 0 : 1);

  useEffect(() => {
    isHome ? setPage(0) : setPage(1);
  }, [isHome]);

  return (
    <HeaderStyle>
      <Container>
        <Logo>CConverter</Logo>
        <Nav>
          <ul>
            {items.map((item) => (
              <Link to={item.to} key={item.id}>
                <Item className={page === item.id ? 'active' : ''}>{item.name}</Item>
              </Link>
            ))}
          </ul>
        </Nav>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
