import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChartNoAxesCombined } from "lucide-react";
import usePostStore from "../../store/postStore";

export default function HomePost() {
  const { product_product, store_store, readPost } = usePostStore();
  const [productList, setProductList] = useState(product_product);
  useEffect(() => {
    readPost("product_product");
    readPost("store_store");
  }, []);

  useEffect(() => {
    if (product_product?.length > 0) {
      const sorted = [...product_product].sort((a, b) => b.popular - a.popular);
      setProductList(sorted);
    }
  }, [product_product]);

  console.log(productList);
  console.log(store_store);

  return (
    <>
      <InfoWrap>
        <ul>
          <InfoItem>
            <h2>상품 수</h2>
            <strong>{productList.length}</strong>
          </InfoItem>
          <InfoItem>
            <h2>매장 수</h2>
            <strong>{store_store.length}</strong>
          </InfoItem>
          <InfoItem>
            <h2>일반 문의 수</h2>
            <strong>60</strong>
          </InfoItem>
          <InfoItem>
            <h2>창업 문의 수</h2>
            <strong>60</strong>
          </InfoItem>
        </ul>

        <DataWrap>
          <div>
            <TitleWrap>
              <ChartNoAxesCombined />
              <h2>상품 순위</h2>
            </TitleWrap>

            <DataProgressWrap>
              <ol>
                {productList?.map((product) => (
                  <ProgressItem key={product.id}>
                    <div>
                      <label htmlFor="">{product.title}</label>
                      <strong>{product.popular} / 999</strong>

                    </div>
                    <progress max={999} value={product.popular} />
                  </ProgressItem>
                ))}
              </ol>
            </DataProgressWrap>
          </div>
          <div>
            <TitleWrap>
              <ChartNoAxesCombined />
              <h2>매장 순위</h2>
            </TitleWrap>

            <DataProgressWrap>....</DataProgressWrap>
          </div>
        </DataWrap>
      </InfoWrap>
    </>
  );
}

const InfoWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > ul {
    display: flex;
    gap: 2rem;
  }
`;

const InfoItem = styled.li`
  width: 100%;
  background-color: var(--white-color);
  border-radius: 1rem;
  padding: 2rem;
  aspect-ratio: 1 / 0.8;
  box-shadow: 0 5px 15px var(--stroke-color);
  position: relative;
  & > h2 {
    font-size: var(--font-sz);
    font-weight: var(--font-rw);
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
  & > strong {
    display: block;
    font-size: 3rem;
    font-weight: var(--font-bw);
  }
`;

const DataWrap = styled.div`
  margin-top: 6rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & > div {
    width: 100%;
    min-height: 0;
    flex-grow: 1;
    background-color: var(--white-color);
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }
  @media screen and (min-width: 769px) {
    flex-direction: row;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & > svg {
    width: var(--font-smz);
  }
  & > h2 {
    font-size: var(--font-smz);
  }
`;

const DataProgressWrap = styled.div`
  box-shadow: inset 0 0 10px blue;
  margin-top: 3rem;
  flex-grow: 1;
  /* min-height: 0; */
  overflow-y: auto;
  ol {
    height: 100%;
    overflow-y: auto;
  }
`;

const ProgressItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  &:not(:first-child) {
    margin-top: 1rem;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & label {
    font-size: var(--font-sz);
  }
  & > progress {
    width: 100%;
    height: 1rem;
    border-radius: 1rem;
    border: 1px solid var(--stroke-color);
    overflow: hidden;
  }
  & > progress::-webkit-progress-bar {
    background-color: var(--white-color);
  }
  & > progress::-webkit-progress-value {
    background-color: var(--boxBg-color);
  }
`;
