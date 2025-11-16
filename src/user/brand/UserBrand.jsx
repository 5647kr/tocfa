import { FullWrap, GridWrap } from "../../components/SectionWrap";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function UserBrand() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <title>StarScope 브랜드</title>
      <h1 className="a11y-hidden">StarScope 브랜드 소개</h1>

      <BrandTitle
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        <h2>별을 관찰하는 일은 기술이 아닌 경험의 확장</h2>
      </BrandTitle>

      <BrandIntro>
        <img
          src="/heroImg/brandIntro-480.webp"
          srcSet="
          /heroImg/brandIntro-480.webp 480w,
          /heroImg/brandIntro-768.webp 768w,
          /heroImg/brandIntro-1024.webp 1024w,
          /heroImg/brandIntro-1440.webp 1440w,
          /heroImg/brandIntro-1920.webp 1920w"
          sizes="100vw"
          alt="렌즈가 보이는 사진"
          loading="lazy"
        />

        <div>
          <h3 data-aos="fade-down" data-aos-delay="200" data-aos-duration="400">
            별을 더 잘 보는 도구
          </h3>
          <strong
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            보다
          </strong>
          <h3 data-aos="fade-down" data-aos-delay="200" data-aos-duration="400">
            세상을 더 넓게 바라보는 시선
          </h3>
        </div>
      </BrandIntro>

      <BrandText>
        <h2 data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
          동아리에서 브랜드가 되기 까지
        </h2>
        <p data-aos="fade-right" data-aos-delay="300" data-aos-duration="800">
          Starscope의 시작은 한 작은 천문 동아리에서 비롯되었습니다. “누구나
          별을 쉽게 관찰할 수 있다면 얼마나 멋질까?” 이 단순한 물음에서 출발해,
          <br />
          광학 기술과 디자인을 결합한 사용자 친화적인 망원경을 만들어왔습니다.
        </p>
        <p data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
          지금도 StarScope는 전문가용 천체망원경부터 입문자, 휴대용 관찰기기까지
          모든 이가 우주와 연결될 수 있는 관문을 만들어가고 있습니다.
        </p>
      </BrandText>

      <BrandTech>
        <img
          src="/heroImg/brandTech-480.webp"
          srcSet="
          /heroImg/brandTech-480.webp 480w,
          /heroImg/brandTech-768.webp 768w,
          /heroImg/brandTech-1024.webp 1024w,
          /heroImg/brandTech-1440.webp 1440w,
          /heroImg/brandTech-1920.webp 1920w"
          sizes="100vw"
          alt="렌즈가 보이는 사진"
          loading="lazy"
        />

        <div>
          <h3 data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            기술과 철학의 결합
          </h3>
          <h3 data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            별을 보는 일은, 사람의 시야를 넓히는 일
          </h3>
        </div>
      </BrandTech>

      <BrandText>
        <h2 data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
          당신의 망원경이 곧, 당신의 우주가 됩니다.
        </h2>
        <p data-aos="fade-right" data-aos-delay="300" data-aos-duration="800">
          정밀 광학 기술에 인간 중심의 사용성을 더했습니다. Starscope의 모든
          제품은 기술과 감성이 공존하는 도구입니다.
        </p>
        <p data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
          StarScope는 단순히 별을 보는 도구를 넘어 하늘을 이해하고, <br />
          꿈꾸는 문화를 만드는 브랜드로 성장하고 있습니다.
        </p>
      </BrandText>
    </>
  );
}

const BrandTitle = styled(GridWrap)`
  & h2 {
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
    text-align: center;
    margin-bottom: 4rem;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    & h2 {
      font-size: var(--font-mlz);
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & h2 {
      font-size: var(--font-lz);
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & h2 {
      font-size: var(--font-xlz);
    }
  }
  @media screen and (min-width: 1441px) {
    & h2 {
      font-size: var(--font-2xlz);
    }
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
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }

  & strong {
    font-size: var(--font-mz);
  }

  & h3:last-child {
    font-size: var(--font-mlz);
    font-weight: var(--font-bw);
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    & h3:first-child {
      font-size: var(--font-mz);
    }

    & strong {
      font-size: var(--font-mlz);
    }

    & h3:last-child {
      font-size: var(--font-lz);
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & h3:first-child {
      font-size: var(--font-mlz);
    }

    & strong {
      font-size: var(--font-lz);
    }

    & h3:last-child {
      font-size: var(--font-xlz);
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & h3:first-child {
      font-size: var(--font-lz);
    }

    & strong {
      font-size: var(--font-xlz);
    }

    & h3:last-child {
      font-size: var(--font-2xlz);
    }
  }
  @media screen and (min-width: 1441px) {
    & h3:first-child {
      font-size: var(--font-xlz);
    }

    & strong {
      font-size: var(--font-2xlz);
    }

    & h3:last-child {
      font-size: var(--font-3xlz);
    }
  }
`;

const BrandText = styled(GridWrap)`
  margin-top: 10rem;
  & > h2 {
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
  }

  & > p {
    font-size: var(--font-smz);
    margin: 1rem 0;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    & > h2 {
      font-size: var(--font-mlz);
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & > h2 {
      font-size: var(--font-lz);
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & > h2 {
      font-size: var(--font-xlz);
    }
  }
  @media screen and (min-width: 1441px) {
    & > h2 {
      font-size: var(--font-2xlz);
    }
  }
`;

const BrandTech = styled(FullWrap)`
  margin-top: 10rem;
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
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    & h3 {
      font-size: var(--font-mlz);
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & h3 {
      font-size: var(--font-lz);
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & h3 {
      font-size: var(--font-xlz);
    }
  }
  @media screen and (min-width: 1441px) {
    & h3 {
      font-size: var(--font-2xlz);
    }
  }
`;
