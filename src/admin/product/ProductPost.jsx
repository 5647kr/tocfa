import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import ConfirmWrap from "../../components/ConfirmWrap";
import usePostStore from "../../store/postStore";
import Button from "../../components/Button";

export default function ProductPost() {
  const { product_product, readPost, deletePost } = usePostStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delId, setDelId] = useState("");
  const [sortProduct, setSortProduct] = useState(product_product);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isLoaded) {
        await readPost("product_product");
        setIsLoaded(true);
      }
      setSortProduct(
        [...product_product].sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    };
    fetchPost();
  }, [product_product, isLoaded, readPost]);

  const activeConfirmDelete = (id) => {
    setConfirmDel(true);
    setDelId(id);
  };

  const cancelDelete = () => {
    setConfirmDel(false);
  };

  const handleDelete = async () => {
    try {
      await deletePost(delId, "product_product");
      setConfirmDel(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <title>StarScope 상품</title>
      <TitleWrap>
        <div>
          <Package />
          <h1>
            전체 상품 목록 <span>/ 총: {sortProduct.length} 개</span>
          </h1>
        </div>
        <Link to={"create"}>신규 상품 등록</Link>
      </TitleWrap>

      <TableWrap>
        {sortProduct.length > 0 ? (
          <ProductTable>
            <thead>
              <tr>
                <th>상품명</th>
                <th>인기도</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortProduct?.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.popular}</td>
                  <td>
                    <Link to={`update/${product.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => activeConfirmDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        ) : (
          <EmptyBox>
            <Package />
            <strong>등록된 상품이 없습니다.</strong>
          </EmptyBox>
        )}
      </TableWrap>

      {confirmDel && (
        <DeleteConfirmBox>
          <h2>정말 삭제하시겠습니까?</h2>
          <div>
            <Button onClick={cancelDelete}>취소</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        </DeleteConfirmBox>
      )}
    </>
  );
}

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & h1,
  span {
    font-size: 1.6rem;
    font-weight: var(--font-mw);
  }
  & span {
    color: var(--bg-color);
  }
  & svg {
    width: 1.6rem;
  }
  & a {
    background-color: var(--boxBg-color);
    color: var(--white-color);
    border-radius: 1rem;
    padding: 1rem 2rem;
    font-size: var(--font-sz);
  }
`;

const TableWrap = styled.div`
  overflow-y: auto;
  margin-top: 6rem;
  height: calc(100% - 9.7rem);
`;

const EmptyBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  & > strong {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
  }
`;

const ProductTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding-right: 1rem;

  & tbody > tr {
    border-top: 1px solid var(--stroke-color);
  }

  & th,
  td {
    width: calc(100% / 4);
    padding: 1.2rem;
  }
  & th {
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }
  & td {
    font-size: var(--font-sz);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  & button,
  a {
    font-size: var(--font-sz);
    width: 100%;
  }
  & button {
    color: var(--error-color);
  }
`;

const DeleteConfirmBox = styled(ConfirmWrap)`
  border-color: var(--error-color);
  & > h2 {
    text-align: center;
    color: var(--error-color);
    font-size: var(--font-mz);
    font-weight: var(--font-mw);
  }
  & > div {
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
  }
  & button {
    width: 100%;
    background-color: var(--error-color);
  }
  & button:first-child {
    background-color: var(--white-color);
    color: var(--text-color);
    border: 1px solid var(--stroke-color);
  }
`;
