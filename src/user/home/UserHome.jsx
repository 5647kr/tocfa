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
    const popularItem = product_product
      .sort((a, b) => b.popular - a.popular)
      .slice(0, 4);

    const promoteItem = product_product
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
        data-aos-duration="800"
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
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img src={homeImgContent2} alt="" />
        </ImgItem>
        <ImgContentItem
          className="right"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img src={promoteProduct[0]?.imgurl} alt={promoteProduct[0]?.title} />
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
          data-aos="fade-right"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img src={promoteProduct[1]?.imgurl} alt={promoteProduct[1]?.title} />
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
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img src={homeImgContent4} alt="" />
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
                  <img src={item?.imgurl} alt={item?.title} />
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
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img src={promoteProduct[2]?.imgurl} alt={promoteProduct[2]?.title} />
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
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <img src={homeImgContent1} alt="" />
        </ImgItem>
        <ImgItem
          data-aos="fade-right"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img src={homeImgContent3} alt="" />
        </ImgItem>
        <ImgContentItem
          className="right"
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img src={promoteProduct[3]?.imgurl} alt={promoteProduct[3]?.title} />
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
        <img src={homeNoticeContent} alt="" />
        <div>
          <img
            src={homeNoticeProduct}
            alt="새 출시 제품"
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-duration="800"
          />
          <NoticeContent
            data-aos="fade-right"
            data-aos-delay="200"
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
`;

const ImgContentItem = styled.div`
  background-color: var(--white-color);
  position: relative;
  & > img {
    width: 50%;
    vertical-align: top;
  }
  &.right > img {
    display: block;
    margin-left: auto;
    transform: scaleX(-1);
  }

  &.right > div {
    left: 1rem;
    text-align: left;
  }
  &.left > div {
    right: 1rem;
    text-align: right;
  }
  & > div {
    position: absolute;
    bottom: 1rem;
  }
  & span {
    color: var(--stroke-color);
    font-size: var(--font-sz);
  }
`;

const ImgItem = styled.div`
  overflow: hidden;
  & > img {
    width: 100%;
    aspect-ratio: 1 / 0.5;
    vertical-align: top;
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

  & > div h3 {
    font-size: var(--font-2xlz);
    font-weight: var(--font-bw);
  }

  & > div p {
    font-size: var(--font-mz);
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
    font-size: var(--font-2xlz);
    font-weight: var(--font-bw);
  }

  & p {
    font-size: var(--font-mz);
  }
`;
