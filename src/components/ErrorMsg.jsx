import styled from "styled-components";
import { TriangleAlert } from "lucide-react";

export default function ErrorMsg({ children, ...props }) {
  return (
    <ErrorWrap {...props}>
      <TriangleAlert color="#fb2c36" />
      <strong>{children}</strong>
    </ErrorWrap>
  );
}

const ErrorWrap = styled.div`
  border: 1px solid #fb2c36;
  background-color: rgba(251, 44, 54, 0.2);
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  display: flex;
  gap: 1.4rem;
  align-items: center;
  & > svg {
    width: 1.4rem;
  }
  & > strong {
    font-size: 1.4rem;
    font-weight: var(--font-rw);
    color: #fb2c36;
  }

`;
