import { FullWrap, GridWrap } from "../../components/SectionWrap";
import styled from "styled-components";
import IntroImg_mobile from "../../assets/img/brandIntroImg_mobile.jpg";
import TechImg_mobile from "../../assets/img/brandTechImg_mobile.jpg";

export default function UserBrand() {
  return (
    <>
      <title>StarScope 브랜드</title>
      <h1 className="a11y-hidden">StarScope 브랜드 소개</h1>

      <BrandTitle>
        <h2>별을 관찰하는 일을 기술이 아닌 경험의 확장</h2>
      </BrandTitle>

      <BrandIntro>
        <img src={IntroImg_mobile} alt="" />

        <div>
          <h3>별을 더 잘 보는 도구</h3>
          <strong>보다</strong>
          <h3>세상을 더 넓게 바라보는 시선</h3>
        </div>
      </BrandIntro>

      <BrandText>
        <h2>동아리에서 브랜드가 되기 까지</h2>
        <p>
          Starscope의 시작은 한 작은 천문 동아리에서 비롯되었습니다. “누구나
          별을 쉽게 관찰할 수 있다면 얼마나 멋질까?” 이 단순한 물음에서 출발해,
          <br />
          광학 기술과 디자인을 결합한 사용자 친화적인 망원경을 만들어왔습니다.
        </p>
        <p>
          지금도 StarScope는 전문가용 천체망원경부터 입문자, 휴대용 관찰기기까지
          모든 이가 우주와 연결될 수 있는 관문을 만들어가고 있습니다.
        </p>
      </BrandText>

      <BrandTech>
        <img src={TechImg_mobile} alt="" />

        <div>
          <h3>기술과 철학의 결합</h3>
          <h3>별을 보는 일은, 사람의 시야를 넓히는 일</h3>
        </div>
      </BrandTech>

      <BrandText>
        <h2>당신의 망원경이 곧, 당신의 우주가 됩니다.</h2>
        <p>
          정밀 광학 기술에 인간 중심의 사용성을 더했습니다. Starscope의 모든
          제품은 기술과 감성이 공존하는 도구입니다.
        </p>
        <p>
          StarScope는 단순히 별을 보는 도구를 넘어 하늘을 이해하고, <br />
          꿈꾸는 문화를 만드는 브랜드로 성장하고 있습니다.
        </p>
      </BrandText>
    </>
  );
}

const BrandTitle = styled(GridWrap)`
  margin-top: 8rem;
  & h2 {
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const BrandIntro = styled(FullWrap)`
  position: relative;
  & > img {
    width: 100%;
    aspect-ratio: 1 / 0.3;
    object-fit: cover;
    vertical-align: top;
  }

  & > div {
    position: absolute;
    width: 100%;
    aspect-ratio: 1 / 0.3;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & h3,
  strong {
    color: var(--white-color);
  }

  & h3:first-child {
    font-size: var(--font-mz);
  }

  & strong {
    font-size: var(--font-lz);
    font-weight: var(--font-bw);
  }

  & h3:last-child {
    font-size: var(--font-lz);
    font-weight: var(--font-bw);
  }
`;

const BrandText = styled(GridWrap)`
  margin-top: 8rem;
  & > h2 {
    font-size: var(--font-lz);
    font-weight: var(--font-bw);
  }

  & > p {
    font-size: var(--font-mz);
    margin: 1rem 0;
  }
  & > p {
  }
`;

const BrandTech = styled(FullWrap)`
  margin-top: 8rem;
  position: relative;

  & > img {
    width: 100%;
    aspect-ratio: 1 / 0.3;
    object-fit: cover;
  }

  & > div {
    position: absolute;
    width: 100%;
    aspect-ratio: 1 / 0.3;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & h3 {
    color: var(--white-color);
    font-size: var(--font-lz);
    font-weight: var(--font-bw);
  }
`;
