import styled from "styled-components";

export default function HeroSection({ bgImg, children }) {
  return (
    <HeroWrap $bgImg={bgImg}>
      <div>{children}</div>
    </HeroWrap>
  );
}

const HeroWrap = styled.section`
  padding: 0;
  height: 40rem;
  background: ${({ $bgImg }) =>
    `url(${$bgImg}) no-repeat center center / cover`};
  position: relative;
  color: var(--white-color);
  & div {
    position: absolute;
    width: 100%;
    height: 40rem;
    background-color: var(--sub-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 4rem;
    font-weight: var(--font-bw);
  }
`;
