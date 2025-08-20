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
  const [isNew, setIsNew] = useState("new");

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

  const handleSort = (e) => {
    const type = e.target.id;
    setIsNew(type);
  };

  useEffect(() => {
    if (laws.length > 0) {
      let sortList = laws.filter((item) => item.category === id);

      if (isNew === "new") {
        sortList = sortList.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else {
        sortList = sortList.sort((a, b) => b.view - a.view);
      }

      setLawList(sortList);
    }
  }, [id, laws, isNew]);

  return (
    <main>
      <HeroSection bgImg={`/assets/img/${id}.webp`}>
        {categoryTitle ? <h2>{categoryTitle.title}</h2> : null}
      </HeroSection>
      <section>
        <FilterWrap>
          <button
            id="new"
            onClick={handleSort}
            className={isNew === "new" ? "active" : ""}
          >
            최신순
          </button>
          <button
            id="view"
            onClick={handleSort}
            className={isNew === "view" ? "active" : ""}
          >
            조회순
          </button>
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
  & button:active {
    box-shadow: none;
  }
  & button.active {
    font-weight: var(--font-bw);
    color: var(--main-color);
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
  & p {
    color: var(--sub-color);
  }
`;
