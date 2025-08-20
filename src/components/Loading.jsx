import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <LoadingWrap>
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <strong>로딩 중...</strong>
      </div>
    </LoadingWrap>
  );
}

const wave = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-20px);
  }
`;

const LoadingWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: var(--sub-color);

  & > div {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  & strong {
    font-weight: var(--font-bw);
    color: var(--white-color);
  }

  & ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  & li {
    width: 2rem;
    aspect-ratio: 1 / 1;
    background-color: var(--white-color);
    border-radius: 50%;
    animation: ${wave} 1s ease-in-out infinite;
  }

  & li:nth-child(1) {
    animation-delay: 0s;
  }
  & li:nth-child(2) {
    animation-delay: 0.1s;
  }
  & li:nth-child(3) {
    animation-delay: 0.2s;
  }
  & li:nth-child(4) {
    animation-delay: 0.3s;
  }
`;
