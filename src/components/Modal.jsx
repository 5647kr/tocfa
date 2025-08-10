import styled from "styled-components";

export default function Modal({ children, className }) {
  return <ModalArticle className={className}>{children}</ModalArticle>;
}

const ModalArticle = styled.article`
  background-color: var(--white-color);
  padding: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
