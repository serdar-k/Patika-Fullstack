import styled, { css } from "styled-components";

const sizes = {
  xsmall: css`
    font-size: 1rem;
    padding: 0.4rem 0.6rem;
    font-weight: 200;
    text-align: center;
  `,
  small: css`
    font-size: 1.2rem;
    padding: 0.6rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,

  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);

    &:hover {
      background-color: var(--color-primary-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  form: css`
    width: 100%;
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);

    :disabled &:hover {
      background-color: var(--color-primary-700);
    }
  `,
  edit: css`
    color: var(--color-green-700);
    background-color: var(--color-grey-0);
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0.6rem;
    border: 1px solid var(--color-green-700);

    &:hover {
      background-color: var(--color-green-700);
      color: var(--color-grey-0);
    }
  `,
  delete: css`
    color: var(--color-red-700);
    background-color: var(--color-grey-0);
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0.6rem;
    border: 1px solid var(--color-red-700);

    &:hover {
      background-color: var(--color-red-700);
      color: var(--color-grey-0);
    }
  `,
  save: css`
    background-color: var(--color-grey-0);
    color: var(--color-green-700);
    border: 1px solid var(--color-green-700);

    &:hover {
      background-color: var(--color-green-700);
      color: var(--color-grey-0);
    }
  `,

  pagination: css`
    background-color: var(--color-primary-600);
    color: var(--color-primary-50);
  `,

  disabled: css`
    background-color: var(--color-grey-600);
    color: var(--color-grey-50);
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &:active {
    transform: scale(0.99) translateY(1px);
    transition: 0.3s all;
  }

  &:disabled {
    transform: none;
    transition: none;
  }

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
