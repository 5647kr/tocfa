import { useEffect, useState } from "react";
import styled from "styled-components";
import usePostStore from "../../store/postStore";
import { Link } from "react-router-dom";
import { FullWrap, GridWrap } from "../../components/SectionWrap";

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

  useEffect(() => {
    if (product_product.length > 0) {
      const items = document.querySelectorAll(".product-items");

      items.forEach((item) => {
        item.classList.remove("show");
        item.style.transitionDelay = "0s";
      });

      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;

        setTimeout(() => {
          item.classList.add("show");
        }, 50);
      });
    }
  }, [product_product, productList]);

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
            <li className="product-items" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.imgurl} alt={product.title} loading="lazy" />
                <h2>{product.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </ProductList>
    </>
  );
}

const FilterBtnWrap = styled(FullWrap)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--bg-color);
  z-index: 20;
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

const ProductList = styled(GridWrap)`
  margin-top: 4rem;
  & ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.6rem;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    & > ul {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & > ul {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.4rem;
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & > ul {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.4rem;
    }
  }

  @media screen and (min-width: 1441px) {
    & > ul {
      grid-template-columns: repeat(4, 1fr);
      gap: 2.4rem;
    }
  }

  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--white-color);
    transition: background-color 1s ease;
  }

  & .product-items {
    opacity: 0;
    transform: translateY(-30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  & .product-items.show {
    opacity: 1;
    transform: translateY(0);
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
