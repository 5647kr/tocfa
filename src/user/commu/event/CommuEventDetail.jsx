import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../../../store/postStore";
import { MoveLeft } from "lucide-react";

export default function CommuEventDetail() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const { commu_event, readPost } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    readPost("commu_event");
  }, []);

  useEffect(() => {
    if (commu_event.length > 0) {
      findEvent(params.id);
    }
  }, [commu_event, params.id]);

  const findEvent = (id) => {
    const findItem = commu_event.find((event) => event.id === id);

    setEvent(findItem);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const BackBtn = () => {
    navigate(-1);
  };

  return (
    <Wrap>
      <ProductTitle>
        <div>
          <button onClick={BackBtn}>
            <MoveLeft />
          </button>
          <h1>{event?.title}</h1>
        </div>
        <p>{formatDate(event?.created_at)}</p>
      </ProductTitle>

      <ContentWrap>
        <img src={event?.imgurl} alt={event?.title} />
        <p>{event?.content}</p>
      </ContentWrap>
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
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--stroke-color);
  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & h1 {
    font-weight: var(--font-bw);
  }
`;

const ContentWrap = styled.div`
  margin-top: 6rem;

  & > img {
    width: 100%;
  }

  & > p {
    margin-top: 2rem;
    font-size: var(--font-mz);
    font-weight: var(--font-mw);
  }
`;
