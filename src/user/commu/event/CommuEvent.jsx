import { useEffect } from "react";
import styled from "styled-components";
import usePostStore from "../../../store/postStore";
import { Link } from "react-router-dom";

export default function CommuEvent() {
  const { commu_event, readPost } = usePostStore();

  useEffect(() => {
    if (commu_event.length === 0) {
      readPost("commu_event");
    }
  }, [commu_event, readPost]);

  return (
    <>
      <title>StarScope 이벤트</title>
      <h1 className="a11y-hidden">StarScope 이벤트</h1>

      <EventList>
        <ul>
          {commu_event?.map((event) => (
            <li key={event?.id}>
              <Link to={`/commu/event/${event?.id}`}>
                <img src={event?.imgurl} alt={event?.title} />
                <div>
                  <h2>{event.title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </EventList>
    </>
  );
}

const EventList = styled.div`
  margin-top: 4rem;
  grid-column: 1 / -1;
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
    background-color: var(--white-color);
    overflow: hidden;
  }

  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    vertical-align: top;
  }
  & li div {
    padding: 1rem;
    min-height: 5rem;
  }
  & h2 {
    font-size: var(--font-sz);
    font-weight: var(--font-rw);
  }
`;
