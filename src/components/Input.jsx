import styled from "styled-components";

function RadioInput({ id, name, checked, onChange, children }) {
  return (
    <RadioInputWrap>
      <input
        type="radio"
        className="a11y-hidden"
        id={id}
        value={id}
        name={name}
        checked={checked}
        onChange={onChange}
        required
      />
      <label htmlFor={id}>{children}</label>
    </RadioInputWrap>
  );
}

function TextInput({ id, name, value, onChange, placeholder }) {
  return (
    <label htmlFor={id}>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </label>
  );
}

function TextArea({ id, name, value, onChange, placeholder }) {
  return (
    <label htmlFor={id}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
      ></textarea>
    </label>
  );
}

const RadioInputWrap = styled.div`
  & label {
    padding: 5px 10px;
    border: 1px solid var(--main-color);
    cursor: pointer;
  }
  & input:checked + label {
    background-color: var(--sub-color);
    color: var(--white-color);
    border-color: var(--sub-color);
  }
`;

export { RadioInput, TextInput, TextArea };
