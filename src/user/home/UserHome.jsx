import styled from "styled-components";
import usePostStore from "../../store/postStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Telescope } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GridWrap, FullWrap } from "../../components/SectionWrap";
import homeImgContent1 from "../../assets/img/homeImgContent1.jpg";
import homeImgContent2 from "../../assets/img/homeImgContent2.jpg";
import homeImgContent3 from "../../assets/img/homeImgContent3.jpg";
import homeImgContent4 from "../../assets/img/homeImgContent4.jpg";
import homeNoticeContent from "../../assets/img/homeNoticeContent.jpg";
import homeNoticeProduct from "../../assets/img/homeNoticeProduct.png";

export default function UserHome() {
  const { product_product, readPost } = usePostStore();
  const [product, setProduct] = useState(null);
  const [promoteProduct, setPromoteProduct] = useState([]);

  useEffect(() => {
    readPost("product_product");
    AOS.init();
  }, []);

  useEffect(() => {
    if (product_product.length > 0) {
      productSorting();
    }
  }, [product_product]);

  const productSorting = () => {
    const popularItem = [...product_product]
      .sort((a, b) => b.popular - a.popular)
      .slice(0, 4);

    const promoteItem = [...product_product]
      .sort((a, b) => a.popular - b.popular)
      .slice(0, 4);

    setProduct(popularItem);
    setPromoteProduct(promoteItem);
  };

  return (
    <>
      <title>starScope 홈페이지</title>
      <h1 className="a11y-hidden">starScope 홈페이지</h1>

      <IntroWrap
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-duration="400"
      >
        <h2>
          눈앞의 별을, 손끝에서 만나다. <br />
          별과 우주의 모든 순간을 포착하는 망원경, <br />
          StarScope
        </h2>
        <p>
          관측의 경계를 넘어서, 당신의 시선을 우주로 확장합니다. <br />
          별빛이 닿는 모든 곳에 StarScope가 함께합니다.
        </p>
      </IntroWrap>

      <ImgContentWrap>
        <ImgItem
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img
            src={homeImgContent2}
            alt="망원경으로 하늘을 바라보는 남자"
            loading="lazy"
          />
        </ImgItem>
        <ImgContentItem
          className="right"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img
            src={promoteProduct[0]?.imgurl}
            alt={promoteProduct[0]?.title}
            loading="lazy"
          />
          <div>
            <h2>{promoteProduct[0]?.title}</h2>
            <p>
              <span>{promoteProduct[0]?.aperture}mm</span>
              <span> / {promoteProduct[0]?.focallength}mm</span>
              <span> / f({promoteProduct[0]?.apertureratio})</span>
            </p>
          </div>
        </ImgContentItem>
        <ImgContentItem
          className="left"
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img
            src={promoteProduct[1]?.imgurl}
            alt={promoteProduct[1]?.title}
            loading="lazy"
          />
          <div>
            <h2>{promoteProduct[1]?.title}</h2>
            <p>
              <span>{promoteProduct[1]?.aperture}mm</span>
              <span> / {promoteProduct[1]?.focallength}mm</span>
              <span> / f({promoteProduct[1]?.apertureratio})</span>
            </p>
          </div>
        </ImgContentItem>
        <ImgItem
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img src={homeImgContent4} alt="망원경 렌즈" loading="lazy" />
        </ImgItem>
      </ImgContentWrap>

      <ProductContentWrap>
        <ProductContentTitle>
          <div>
            <Telescope />
            <h2>Best Product</h2>
          </div>

          <Link to={"/product"}>
            Show all({product_product ? product_product.length : 0})
          </Link>
        </ProductContentTitle>

        <ProductContentList>
          {product?.map((item, index) => (
            <li
              key={item.id}
              data-aos="fade-down"
              data-aos-delay={index * 200}
              data-aos-duration="800"
            >
              <Link to={`/product/${item?.id}`}>
                <div>
                  <img src={item?.imgurl} alt={item?.title} loading="lazy" />
                  <h3>{item?.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ProductContentList>
      </ProductContentWrap>

      <ImgContentWrap>
        <ImgContentItem
          className="left"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img
            src={promoteProduct[2]?.imgurl}
            alt={promoteProduct[2]?.title}
            loading="lazy"
          />
          <div>
            <h2>{promoteProduct[2]?.title}</h2>
            <p>
              <span>{promoteProduct[2]?.aperture}mm</span>
              <span> / {promoteProduct[2]?.focallength}mm</span>
              <span> / f({promoteProduct[2]?.apertureratio})</span>
            </p>
          </div>
        </ImgContentItem>
        <ImgItem
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img src={homeImgContent1} alt="은하를 담은 사진" loading="lazy" />
        </ImgItem>
        <ImgItem
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img
            src={homeImgContent3}
            alt="망원경과 호환되는 카메라 렌즈"
            loading="lazy"
          />
        </ImgItem>
        <ImgContentItem
          className="right"
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img
            src={promoteProduct[3]?.imgurl}
            alt={promoteProduct[3]?.title}
            loading="lazy"
          />
          <div>
            <h2>{promoteProduct[3]?.title}</h2>
            <p>
              <span>{promoteProduct[3]?.aperture}mm</span>
              <span> / {promoteProduct[3]?.focallength}mm</span>
              <span> / f({promoteProduct[3]?.apertureratio})</span>
            </p>
          </div>
        </ImgContentItem>
      </ImgContentWrap>

      <NoticeContentWrap>
        <img src={homeNoticeContent} alt="은하를 담은 사진" />
        <div>
          <img
            src={homeNoticeProduct}
            alt="새 출시 제품"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
          />
          <NoticeContent
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            <h3>Skyliner N 254/1200 Classic 출시</h3>
            <p>254mm / 1200mm / f/4.7</p>
          </NoticeContent>
        </div>
      </NoticeContentWrap>
    </>
  );
}

const IntroWrap = styled(GridWrap)`
  & > h2 {
    text-align: center;
    font-weight: var(--font-bw);
    font-size: var(--font-lz);
  }

  & > p {
    text-align: center;
    font-size: var(--font-smz);
    margin-top: 2rem;
  }
`;

const ImgContentWrap = styled(GridWrap)`
  margin-top: 8rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;

  & > div {
    aspect-ratio: 1 / 0.5;
    border-radius: 1rem;
    box-shadow: 0 5px 15px var(--stroke-color);
  }
  @media screen and (max-width: 768px) {
    & > div {
      aspect-ratio: 1 / 0.8;
    }
  }
`;

const ImgContentItem = styled.div`
  background-color: var(--white-color);
  display: flex;
  justify-content: space-between;
  align-content: flex-end;
  padding: 1rem;
  & > img {
    width: 50%;
    vertical-align: top;
    z-index: 1;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &.right {
    flex-direction: row-reverse;
  }
  &.right > img {
    transform: scaleX(-1);
  }
  &.left h2 {
    text-align: right;
  }
  &.left p {
    text-align: right;
  }

  & h2 {
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }
  & span {
    color: var(--stroke-color);
    font-size: var(--font-sz);
  }

  @media screen and (max-width: 768px) {
    & > img {
      aspect-ratio: 1 / 0.8;
      object-fit: cover;
    }
  }

  @media screen and (min-width: 1025px) {
    & h2 {
      font-size: var(--font-lz);
    }
  }
`;

const ImgItem = styled.div`
  overflow: hidden;
  & > img {
    width: 100%;
    aspect-ratio: 1 / 0.5;
    vertical-align: top;
  }
  @media screen and (max-width: 768px) {
    & > img {
      aspect-ratio: 1 / 0.8;
      object-fit: cover;
    }
  }
`;

const ProductContentWrap = styled(GridWrap)`
  margin-top: 8rem;
`;

const ProductContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  & h2 {
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
  }
`;

const ProductContentList = styled.ul`
  margin-top: 4rem;
  display: flex;
  gap: 1.6rem;

  & > li {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 5px 15px var(--stroke-color);
    background-color: var(--white-color);
  }

  & img {
    width: 100%;
  }

  & h3 {
    text-align: center;
  }
`;

const NoticeContentWrap = styled(FullWrap)`
  margin-top: 8rem;
  position: relative;
  box-shadow: 0 5px 15px var(--stroke-color);
  & > img {
    width: 100%;
    vertical-align: top;
    aspect-ratio: 1 / 0.5;
    object-fit: cover;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 0.5;
    background-color: rgba(0, 0, 0, 0.4);
  }

  & > div > img {
    position: absolute;
    width: 40%;
    right: 0;
    bottom: 0;
  }
`;

const NoticeContent = styled.div`
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  & h3,
  p {
    color: var(--white-color);
  }

  & h3 {
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
  }

  & p {
    font-size: var(--font-mz);
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
