import styled from "styled-components";

export default function Loading() {
  return (
    <Wrap>
      <Background>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Background>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg);
`;

const Star = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 4px;
  background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #699bff);
  animation: tail 3s ease-in-out infinite, falling 3s ease-in-out infinite;

  @keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes falling {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300px);
    }
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 2px);
    right: 0;
    height: 4px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff);
    border-radius: 100%;
    transform: translateX(50%) rotateZ(45deg);
    animation: shining 3s ease-in-out infinite;
  }

  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }

  &::after {
    transform: translateX(50%) rotateZ(-45deg);
  }

  &:nth-child(1) {
    top: calc(50% - 120px);
    left: calc(50% - 250px);
    animation-delay: 0.8s;
  }
  &:nth-child(1)::before,
  &:nth-child(1)::after {
    animation-delay: 0.8s;
  }

  &:nth-child(2) {
    top: calc(50% - 60px);
    left: calc(50% - 200px);
    animation-delay: 1s;
  }
  &:nth-child(2)::before,
  &:nth-child(2)::after {
    animation-delay: 1s;
  }

  &:nth-child(3) {
    top: calc(50%);
    left: calc(50% - 150px);
    animation-delay: 1.2s;
  }
  &:nth-child(3)::before,
  &:nth-child(3)::after {
    animation-delay: 1.2s;
  }

  &:nth-child(4) {
    top: calc(50% + 60px);
    left: calc(50% - 100px);
    animation-delay: 1.4s;
  }
  &:nth-child(4)::before,
  &:nth-child(4)::after {
    animation-delay: 1.4s;
  }

  &:nth-child(5) {
    top: calc(50% + 120px);
    left: calc(50% - 50px);
    animation-delay: 1.6s;
  }
  &:nth-child(5)::before,
  &:nth-child(5)::after {
    animation-delay: 1.6s;
  }
`;
