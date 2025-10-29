import { useEffect, useState } from "react";
import styled from "styled-components";
import usePostStore from "../../store/postStore";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function UserProduct() {
  const [activeProduct, setActiveProduct] = useState(
    localStorage.getItem("product") || "A"
  );
  const { product_product, readPost } = usePostStore();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (product_product.length === 0) {
      readPost("product_product");
    }
  }, [product_product, readPost]);

  useEffect(() => {
    if (product_product.length > 0) {
      filterProduct(activeProduct);
    }
  }, [product_product, activeProduct]);

  const handleClickFilter = (value) => {
    localStorage.setItem("product", value);
    setActiveProduct(value);
  };

  const filterProduct = (value) => {
    const filtered = product_product.filter(
      (product) => product.type === value
    );
    setProductList(filtered);
  };

  if (productList.length === 0) return <Loading />;

  return (
    <>
      <title>StarScope 제품</title>
      <h1 className="a11y-hidden">StarScope 망원경 제품</h1>

      <FilterBtnWrap>
        <ul>
          <li>
            <FilterBtn
              value="A"
              $isActive={activeProduct === "A"}
              onClick={(e) => {
                handleClickFilter(e.target.value);
              }}
            >
              굴절 망원경
            </FilterBtn>
          </li>
          <li>
            <FilterBtn
              value="B"
              $isActive={activeProduct === "B"}
              onClick={(e) => {
                handleClickFilter(e.target.value);
              }}
            >
              반사 망원경
            </FilterBtn>
          </li>
          <li>
            <FilterBtn
              value="C"
              $isActive={activeProduct === "C"}
              onClick={(e) => {
                handleClickFilter(e.target.value);
              }}
            >
              돕소니안
            </FilterBtn>
          </li>
        </ul>
      </FilterBtnWrap>

      <ProductList>
        <ul>
          {productList?.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.imgurl} alt={product.title} />
                <h2>{product.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </ProductList>
    </>
  );
}

const FilterBtnWrap = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--bg-color);
  z-index: 20;
  grid-column: 1 / -1;
  & > ul {
    display: flex;
    justify-content: center;
  }
  & li {
    width: 8rem;
  }
`;

const FilterBtn = styled.button`
  width: 100%;
  height: 4rem;
  font-size: var(--font-sz);
  color: ${({ $isActive }) =>
    $isActive ? "var(--text-color)" : "var(--stroke-color)"};
  font-weight: ${({ $isActive }) =>
    $isActive ? "var(--font-bw)" : "var(--font-rw)"};
`;

const ProductList = styled.div`
  margin-top: 4rem;
  & ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.6rem;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    & {
      grid-column: 2 / -2;
    }
    & ul {
      gap: 2rem;
    }
  }

  @media screen and (min-width: 769px) {
    & {
      grid-column: 3 / -3;
    }
    & ul {
      gap: 2.4rem;
    }
  }
  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--bg-color);
    transition: background-color 1s ease;
  }

  & li:hover {
    background-color: var(--stroke-color);
    box-shadow: inset 0 5px 15px var(--stroke-color);
  }

  & img {
    width: 100%;
    vertical-align: top;
    scale: 1;
    transition: scale 0.5s ease;
  }
  & li:hover img {
    scale: 1.1;
  }
  & h2 {
    font-size: var(--font-smz);
    font-weight: var(--font-rw);
    text-align: center;
    margin-top: 1rem;
  }

  &li:hover h2 {
    color: var(--white-color);
  }
`;
