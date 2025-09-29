import styled from "styled-components";
import { TriangleAlert } from "lucide-react";

export default function ErrorBox({ children }) {
  return (
    <ErrorWrap>
      <TriangleAlert />
      <strong>{children}</strong>
    </ErrorWrap>
  );
}

const ErrorWrap = styled.div`
  padding: 1.2rem;
  border: 1px solid var(--error-color);
  background-color: var(--errorBg-color);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & > svg {
    width: 1.4rem;
    stroke: var(--error-color);
  }

  & > strong {
    font-size: 1.4rem;
    color: var(--error-color);
  }
`;
