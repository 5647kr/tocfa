import styled from "styled-components";

export default function UserFooter() {
  return (
    <FooterWrap>
      <h4>StarScope</h4>
      <FooterContent>
        <span>
          <strong>주식회사</strong>StarScope
        </span>
        <span>
          <strong>대표자</strong>StarScope
        </span>
        <span>
          <strong>사업자번호</strong>214-86-39201
        </span>
        <br />
        <span>
          <strong>주소</strong>서울시 강남구 12-45
        </span>
        <span>
          <strong>대표번호</strong>02-3456-7788
        </span>
        <span>
          <strong>문의</strong>cs@starscope.co.kr
        </span>
      </FooterContent>

      <p>Copyright ⓒ starScope. all Rights Reserved.</p>
      <p>DESIGNED BY 5647kr</p>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  width: 100%;
  height: 30rem;
  background-color: var(--text-color);
  padding: 4rem;

  & h4 {
    font-size: var(--font-lz);
    font-weight: var(--font-bw);
    color: var(--white-color);
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--white-color);
  }

  & > p {
    color: var(--white-color);
    font-size: var(--font-sz);
  }
  & > p:last-child {
    margin-top: 1rem;
  }
`;

const FooterContent = styled.div`
  margin: 4rem 0 2rem;

  & span,
  strong {
    font-size: var(--font-sz);
    color: var(--white-color);
    margin-right: 1rem;
  }
  & strong {
    font-weight: var(--font-mw);
  }
`;
