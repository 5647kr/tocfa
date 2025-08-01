import styled from "styled-components";

export function RadioInput({ id, name, checked, onChange, children }) {
  return (
    <RadioInputWrap>
      <input
        type="radio"
        className="a11y-hidden"
        id={id}
        value={id}
        name={name}
        defaultChecked={checked}
        onChange={onChange}
        required
      />
      <label htmlFor={id}>{children}</label>
    </RadioInputWrap>
  );
}

export function TextInput({ id, type, name, placeholder, children }) {
  return (
    <TextInputWrap>
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </TextInputWrap>
  );
}

export function TextArea({ id, name, placeholder, children }) {
  return (
    <TextAreaWrap>
      <label htmlFor={id}>{children}</label>
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        required
      ></textarea>
    </TextAreaWrap>
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
  & > label {
    font-weight: var(--font-bw);
  }
  & > input {
    padding: 10px;
  }
`;

const TextAreaWrap = styled(TextInputWrap)`
  & > textarea {
    resize: none;
    height: 200px;
    padding: 10px;
  }
`;
