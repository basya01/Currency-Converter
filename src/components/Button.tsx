import { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonStyle = styled.button`
  display: block;
  border: none;
  background: ${({theme}) => theme.brightBlue};
  color: ${({theme}) => theme.white};
  padding: 12px 29px;
  border-radius: 20px;
  font-size: 16px;
  font-family: ${({theme}) => theme.fontFamily};
  cursor: pointer;
`;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};
