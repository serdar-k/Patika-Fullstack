import styled, { css } from "styled-components";

const variations = {
  mismatch: css`
    border-bottom: 1px solid var(--color-red-700);
    background-color: var(--color-red-100);
    transition: all 0.3s;
  `,
};

const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  padding: 0.6rem 0.8rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.5s;

  ${(props) => variations[props.mismatch]}
`;

export default Input;
