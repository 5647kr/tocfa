import styled from "styled-components";

export function RadioInput({ id, name, checked, children }) {
  return (
    <RadioInputWrap>
      <input
        type="radio"
        className="a11y-hidden"
        id={id}
        name={name}
        defaultChecked={checked}
      />
      <label htmlFor={id}>{children}</label>
    </RadioInputWrap>
  );
}

export function TextInput({ id, type, name, placeholder, children }) {
  return (
    <TextInputWrap>
      <label htmlFor={id}>{children}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} autoComplete="off" required />
    </TextInputWrap>
  );
}

const RadioInputWrap = styled.div`
  & > label {
    padding: 5px 10px;
    border: 1px solid var(--main-color);
    cursor: pointer;
  }

  & > input:checked + label {
    background-color: var(--shadow-color);
    color: var(--bg-color);
  }
`;

const TextInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    padding: 10px;
  }
`;
