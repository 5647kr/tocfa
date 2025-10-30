import styled from "styled-components";
import usePostStore from "../../store/postStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Telescope } from "lucide-react";

export default function UserHome() {
  const { product_product, readPost } = usePostStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    readPost("product_product");
  }, []);

  useEffect(() => {
    if (product_product.length > 0) {
      popularProduct();
    }
  }, [product_product]);

  const popularProduct = () => {
    const popularItem = product_product
      .sort((a, b) => b.popular - a.popular)
      .slice(0, 4);

    setProduct(popularItem);
  };

  console.log(product);

  return (
    <Wrap>
      <title>starScope 홈페이지</title>
      <h1 className="a11y-hidden">starScope 홈페이지</h1>

      <IntroWrap>
        <h2></h2>
      </IntroWrap>

      <ImgContentWrap>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </ImgContentWrap>

      <ProductWrap>
        <ProductTitle>
          <div>
            <Telescope />
            <h2>Best Product</h2>
          </div>
          <Link>Show All ({product_product.length})</Link>
        </ProductTitle>
        <ul>
          {product?.map((item) => (
            <ProductItem key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item.imgurl} alt={item.title} />
                <h2>{item.title}</h2>
              </Link>
            </ProductItem>
          ))}
        </ul>
      </ProductWrap>

      <ImgContentWrap>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </ImgContentWrap>

      <NoticeWrap></NoticeWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: contents;
  & > div {
    grid-column: 1 / -1;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    & > div {
      grid-column: 2 / -2;
    }
  }

  @media screen and (min-width: 769px) {
    & > div {
      grid-column: 3 / -3;
    }
  }
`;

const IntroWrap = styled.div`
  & > h2 {
  }
`;

const ImgContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  margin-top: 8rem;

  & > div {
    background-color: var(--white-color);
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    aspect-ratio: 1 / 0.5;
  }
`;

const ProductWrap = styled.div`
  margin-top: 8rem;
  & > ul {
    display: flex;
    gap: 1.6rem;
    margin-top: 4rem;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    & > ul {
      gap: 2rem;
    }
  }
  @media screen and (min-width: 769px) {
    & > ul {
      gap: 2.4rem;
    }
  }
`;

const ProductTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
  }
  & h2 {
    margin-left: 0.5rem;
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
  }
  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
  & a {
    color: var(--boxBg-color);
  }
`;

const ProductItem = styled.li`
  background-color: var(--white-color);
  box-shadow: 0 5px 15px var(--stroke-color);
  border-radius: 1rem;
  padding: 1rem;
  & img {
    width: 100%;
  }
  & h2 {
    margin-top: 1rem;
    font-size: var(--font-mz);
    font-weight: var(--font-mw);
    text-align: center;
  }
`;

const NoticeWrap = styled.div`
  margin-top: 8rem;
  box-shadow: inset 0 0 10px red;
  aspect-ratio: 1 / 0.5;
`;
