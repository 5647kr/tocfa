import { useEffect } from "react";
import styled from "styled-components";
import usePostStore from "../../../store/postStore";
import { Link } from "react-router-dom";
import { GridWrap } from "../../../components/SectionWrap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CommuEvent() {
  const { commu_event, readPost } = usePostStore();

  useEffect(() => {
    AOS.init();
  }, []);

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
          {commu_event?.map((event, index) => (
            <li
              key={event?.id}
              data-aos="fade-up"
              data-aos-delay={200 * index}
              data-aos-duration="800"
            >
              <Link to={`/commu/event/${event?.id}`}>
                <img src={event?.imgurl} alt={event?.title} loading="lazy" />
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

const EventList = styled(GridWrap)`
  margin-top: 4rem;
  & ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.6rem;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    & ul {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    & ul {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.4rem;
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    & ul {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.4rem;
    }
  }
  @media screen and (min-width: 1441px) {
    & ul {
      grid-template-columns: repeat(4, 1fr);
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
