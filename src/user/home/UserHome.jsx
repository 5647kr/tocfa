import styled from "styled-components";
import usePostStore from "../../store/postStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Telescope } from "lucide-react";
import { GridWrap, FullWrap } from "../../components/SectionWrap";

export default function UserHome() {
  const { product_product, readPost } = usePostStore();
  const [product, setProduct] = useState(null);
  const [promoteProduct, setPromoteProduct] = useState(null);

  useEffect(() => {
    readPost("product_product");
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

      <IntroWrap>
        ...
        <h2></h2>
      </IntroWrap>

      <ImgContentWrap>
        <div>1</div>
        <ImgContentItem>2</ImgContentItem>
        <ImgContentItem>3</ImgContentItem>
        <div>4</div>
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
          {product?.map((item) => (
            <li key={item.id}>
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
        <ImgContentItem>1</ImgContentItem>
        <div>2</div>
        <div>3</div>
        <ImgContentItem>2</ImgContentItem>
      </ImgContentWrap>

      <NoticeContentWrap>...</NoticeContentWrap>
    </>
  );
}

const IntroWrap = styled(GridWrap)`
  box-shadow: inset 0 0 10px red;
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
  }
`;

const ProductContentWrap = styled(GridWrap)`
  box-shadow: inset 0 0 10px blue;
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
  box-shadow: inset 0 0 10px green;
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
  box-shadow: inset 0 0 10px yellow;
  margin-top: 8rem;
`;
