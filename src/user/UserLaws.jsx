import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import { Link, useParams } from "react-router-dom";
import usePostStore from "../store/PostStore";
import styled from "styled-components";

export default function UserLaws() {
  const params = useParams();
  const id = params.id;
  const { setTypeSelect, categoryTable, readTable, laws, category } =
    usePostStore();
  const [lawList, setLawList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);

  useEffect(() => {
    setTypeSelect("laws");
    categoryTable();
    readTable();
  }, [id]);

  useEffect(() => {
    if (category.length > 0) {
      setCategoryTitle(category.find((item) => item.engName === id) || null);
    }
  }, [category, id]);

  useEffect(() => {
    if (laws.length > 0) {
      setLawList(laws.filter((item) => item.category === id));
    }
  }, [laws, id]);

  console.log(lawList);

  return (
    <main>
      <HeroSection bgImg={`/assets/img/${id}.webp`}>
        {categoryTitle ? <h2>{categoryTitle.title}</h2> : null}
      </HeroSection>
      <section>
        <FilterWrap>
          <button>등록순</button>
          <button>조회순</button>
        </FilterWrap>
        <LawWrap>
          <ul>
            {lawList.map((item) => {
              const date = new Date(item.created_at).toLocaleDateString(
                "ko-KR",
                {
                  timeZone: "Asia/Seoul",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              );
              return (
                <li key={item.id}>
                  <Link to={`${item.id}`}>
                    <h3>{item.title}</h3>
                    <p>등록일: {date}</p>
                    <p className="a11y-hidden">조회수: {item.view}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </LawWrap>
      </section>
    </main>
  );
}

const FilterWrap = styled.div`
  margin-block: 4rem;
  text-align: right;
  & button {
    background-color: transparent;
    color: var(--sub-color);
    font-weight: var(--font-rw);
    padding: 0;
    padding-inline: 0.5rem;
  }
  & button:first-child {
    border-right: 1px solid var(--sub-color);
  }
`;

const LawWrap = styled.div`
  & li {
    padding: 1rem;
    border-bottom: 1px solid var(--sub-color);
  }
  & a {
    display: flex;
    justify-content: space-between;
  }
`;
