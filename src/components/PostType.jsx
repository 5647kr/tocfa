import styled from "styled-components";

export default function PostType({ isNotice, setIsNotice }) {
  const checkNotice = (e) => setIsNotice(e === "notice");

  return (
    <InputWrap>
      <input
        type="radio"
        className="a11y-hidden"
        name="type"
        id="notice"
        onChange={(e) => {
          checkNotice(e.target.id);
        }}
        checked={isNotice}
      />
      <label htmlFor="notice">공지사항</label>
      <input
        type="radio"
        className="a11y-hidden"
        name="type"
        id="laws"
        onChange={(e) => {
          checkNotice(e.target.id);
        }}
        checked={!isNotice}
      />
      <label htmlFor="laws">법률정보</label>
    </InputWrap>
  );
}

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  & > label {
    padding: 5px 10px;
    border: 1px solid var(--main-color);
    cursor: pointer;
  }

  & > label:nth-child(2) {
    border-right: none;
  }

  & > input:checked + label {
    background-color: var(--shadow-color);
    color: var(--bg-color);
  }
`;
