import styled from "styled-components";

export default function Input({...props}) {
  return (
    <StyledInput {...props} />
  )
}

const StyledInput = styled.input`
  background-color: var(--white-color);
  border: none;
  font-size: var(--font-smz);
  &::placeholder {
    color: var(--bg-color);
  }
`