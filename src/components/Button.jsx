import styled from "styled-components";

function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

function SubmitButton({children, ...props}) {
  return <SubmitButtonStyled {...props}>{children}</SubmitButtonStyled>
}

const ButtonStyled = styled.button`
  background-color: transparent;
  border: none;
`;

const SubmitButtonStyled = styled(ButtonStyled)`
  background-color: var(--bg-color);
  padding: 1rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px var(--gray-color);
  &:active {
    box-shadow: inset 0 2px 4px var(--gray-color);
  }
`

export { Button, SubmitButton };