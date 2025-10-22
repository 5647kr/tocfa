import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePostStore from "../../store/postStore";
import styled from "styled-components";
import { Telescope } from "lucide-react";

export default function UserProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const { product_product, readPost } = usePostStore();
  const [popular, setPopular] = useState(null);

  useEffect(() => {
    readPost("product_product");
  }, []);

  useEffect(() => {
    if (product_product.length > 0) {
      findProduct(params.id);
      popularProduct();
    }
  }, [product_product, params.id]);

  const findProduct = (id) => {
    const findItem = product_product.find((product) => product.id === id);

    setProduct(findItem);
  };

  const popularProduct = () => {
    const type = localStorage.getItem("product");
    const popularItem = product_product
      .filter((product) => product.type === type)
      .sort((a, b) => b.popular - a.popular)
      .slice(0, 3);

    setPopular(popularItem);
  };

  const productType = (type) => {
    switch (type) {
      case "A":
        return "굴절 망원경";
      case "B":
        return "반사 망원경";
      case "C":
        return "돕소니안";
      default:
        return "굴절 망원경";
    }
  };

  return (
    <Wrap>
      <ProductTitle>
        <ImgWrap>
          <img src={product?.imgurl} alt={product?.title} />
        </ImgWrap>
        <TitleWrap>
          <strong>{productType(product?.type)}</strong>
          <h1>{product?.title}</h1>
          <p>{product?.content}</p>
        </TitleWrap>
      </ProductTitle>

      <ProductSpec>
        <ContentTitle>
          <Telescope />
          <h2>제품 사양</h2>
        </ContentTitle>

        <SpecList>
          <li>
            <h3>구경</h3>
            <p>{product?.aperture}mm</p>
          </li>
          <li>
            <h3>초점거리</h3>
            <p>{product?.focallength}mm</p>
          </li>
          <li>
            <h3>초점비</h3>
            <p>f/{product?.apertureratio}</p>
          </li>
        </SpecList>
      </ProductSpec>

      <PopularProduct>
        <ContentTitle>
          <Telescope />
          <h2>인기 제품</h2>
        </ContentTitle>

        <ProductList>
          {popular?.map((item) => (
            <li key={item?.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item?.imgurl} alt={item?.title} />
                <h4>{item?.title}</h4>
              </Link>
            </li>
          ))}
        </ProductList>
      </PopularProduct>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: contents;
  & > div {
    grid-column: 1 / -1;

    @media screen and (min-width: 481px) and (max-width: 768px) {
      & {
        grid-column: 2 / -2;
      }
    }

    @media screen and (min-width: 769px) {
      & {
        grid-column: 3 / -3;
      }
    }
  }
`;

const ProductTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  width: 100%;
  @media screen and (min-width: 769px) {
    flex-direction: row;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  & > img {
    width: 100%;
    vertical-align: top;
    aspect-ratio: 1 / 1;
    scale: 1;
    transition: scale 0.5s ease;
  }
  & > img:hover {
    scale: 1.2;
  }
`;

const TitleWrap = styled.div`
  width: 100%;
  padding-block: 0;
  @media screen and (min-width: 769px) {
    padding-block: 6rem;
  }
  & > strong {
    background-color: var(--boxBg-color);
    color: var(--white-color);
    padding: 0.6rem 1.2rem;
    border-radius: 1rem;
    font-size: var(--font-sz);
    width: fit-content;
  }
  & > h1 {
    font-size: var(--font-4xlz);
    font-weight: var(--font-bw);
    margin-block: 2rem;
  }
  & > p {
    word-break: keep-all;
    font-size: var(--font-mz);
    font-weight: var(--font-mw);
  }
`;

const ProductSpec = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  & > svg {
    width: 3rem;
    height: 3rem;
  }
  & > h2 {
    font-size: var(--font-2xlz);
    font-weight: var(--font-bw);
  }
`;

const SpecList = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  & > li {
    width: 10rem;
    border: 1px solid var(--stroke-color);
    padding: 0.6rem 1.2rem;
    border-radius: 1rem;
  }
  & h3 {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
  }
  & p {
    font-size: var(--font-sz);
    text-align: right;
    margin-top: 0.6rem;
  }
`;

const PopularProduct = styled.div`
  margin-top: 8rem;
`;

const ProductList = styled.ul`
  display: flex;
  gap: 6rem;
  margin-top: 2rem;
  padding-inline: 6rem;
  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--white-color);
  }

  & img {
    width: 100%;
    vertical-align: top;
    scale: 1;
    transition: scale 0.5s ease;
  }
  & li:hover img {
    scale: 1.2;
  }
  & h4 {
    font-size: var(--font-mz);
    font-weight: var(--font-rw);
    text-align: center;
    margin-top: 1rem;
  }
`;
