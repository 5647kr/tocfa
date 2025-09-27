import styled from "styled-components"

export default function Button({children, props}) {
  return (
    <StyledButton {...props}>{children}</StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: var(--boxBg-color);
  color: var(--white-color);
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: none;
  font-weight: var(--font-mw);
  font-size: var(--font-smz);
`