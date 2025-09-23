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
  padding: 1rem 2rem;
  border-radius: 1rem;
`

export { Button, SubmitButton };