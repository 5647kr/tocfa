import styled from "styled-components";

export default function Input({ ...props }) {
  return <InputStyled type="text" {...props} />;
}

const InputStyled = styled.input`
  width: 100%;
  border: none;
  background-color: var(--white-color);
`;
