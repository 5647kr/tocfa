import styled from "styled-components";

export default function ContentSection({ className, children }) {
  return <ContentWrap className={className}>{children}</ContentWrap>;
}

const ContentWrap = styled.section`
  margin-top: 8rem;
  & h2 {
    text-align: center;
    font-weight: var(--font-bw);
  }
`;
