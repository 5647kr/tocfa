import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChartNoAxesCombined } from "lucide-react";
import usePostStore from "../../store/postStore";

export default function HomePost() {
  const { product_product, store_store, readPost } = usePostStore();
  const [productList, setProductList] = useState(product_product);
  const [storeList, setStoreList] = useState(store_store);
  useEffect(() => {
    readPost("product_product");
    readPost("store_store");
  }, []);

  useEffect(() => {
    if (product_product?.length > 0) {
      const sorted = [...product_product].sort((a, b) => b.popular - a.popular);
      setProductList(sorted);
    }
    if (store_store?.length > 0) {
      const sorted = [...store_store].sort(
        (a, b) => b.performance - a.performance
      );
      setStoreList(sorted);
    }
  }, [product_product, store_store]);

  return (
    <>
      <title>StarScope 데시보드</title>
      <h1 className="a11y-hidden">StarScope DashBoard</h1>
      <InfoList>
        <li>
          <h2>상품 수</h2>
          <strong>{productList?.length}</strong>
        </li>
        <li>
          <h2>매장 수</h2>
          <strong>{storeList?.length}</strong>
        </li>
        <li>
          <h2>일반 문의 수</h2>
          <strong>{productList?.length}</strong>
        </li>
        <li>
          <h2>창업 문의 수</h2>
          <strong>{productList?.length}</strong>
        </li>
      </InfoList>

      <DataWrap>
        <div>
          <TitleWrap>
            <ChartNoAxesCombined />
            <h3>상품 순위</h3>
          </TitleWrap>
          <DataList>
            {productList?.map((product) => (
              <li key={product.id}>
                <div>
                  <label htmlFor="">{product.title}</label>
                  <strong>
                    <span>{product.popular}</span> / 999
                  </strong>
                </div>
                <progress max={999} value={product.popular} />
              </li>
            ))}
          </DataList>
        </div>
        <div>
          <TitleWrap>
            <ChartNoAxesCombined />
            <h3>매장 순위</h3>
          </TitleWrap>
          <DataList>
            {storeList?.map((store) => (
              <li key={store.id}>
                <div>
                  <label htmlFor="">{store.title}</label>
                  <strong>
                    <span>{store.performance}</span> / 999
                  </strong>
                </div>
                <progress max={999} value={store.performance} />
              </li>
            ))}
          </DataList>
        </div>
      </DataWrap>
    </>
  );
}

const InfoList = styled.ul`
  display: flex;
  gap: 2rem;
  & > li {
    width: 100%;
    height: 10rem;
    padding: 1rem;
    position: relative;
    background-color: var(--white-color);
    border-radius: 1rem;
    box-shadow: 0 5px 15px var(--stroke-color);
  }
  li > h2 {
    font-size: var(--font-sz);
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
  li > strong {
    font-size: 3rem;
    font-weight: var(--font-bw);
  }
`;

const DataWrap = styled.div`
  margin-top: 6rem;
  height: calc(100% - 16rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & > div {
    width: 100%;
    height: calc(50% - 1rem);
    background-color: var(--white-color);
    border-radius: 1rem;
    box-shadow: 0 5px 15px var(--stroke-color);
    padding: 2rem;
  }
  @media screen and (min-width: 769px) {
    flex-direction: row;
    & > div {
      height: 100%;
    }
  }
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & > svg {
    width: 1.6rem;
  }
  & > h3 {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
  }
`;

const DataList = styled.ul`
  margin-top: 2rem;
  height: calc(100% - 4.4rem);
  overflow-y: auto;
  padding-right: 1rem;
  & > li {
    display: flex;
    flex-direction: column;
  }
  li:not(:first-child) {
    margin-top: 1rem;
  }
  li > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.4rem;
  }
  li > div label {
    font-size: var(--font-smz);
  }
  li > div span {
    font-size: var(--font-sz);
    font-weight: var(--font-bw);
  }
  li > progress {
    width: 100%;
    height: 1rem;
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    overflow: hidden;
  }
  li > progress::-webkit-progress-bar {
    background-color: var(--white-color);
  }
  li > progress::-webkit-progress-value {
    height: 1rem;
    background-color: var(--boxBg-color);
  }
`;
