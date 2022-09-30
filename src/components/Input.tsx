import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputStyle = styled.input`
  border: none;
  background: ${({ theme }) => theme.gray};
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputStyle ref={ref} {...props} />;
});
