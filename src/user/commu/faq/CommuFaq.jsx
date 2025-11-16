import { useEffect } from "react";
import styled from "styled-components";
import usePostStore from "../../../store/postStore";
import { Sparkles } from "lucide-react";
import { GridWrap } from "../../../components/SectionWrap";

export default function CommuFaq() {
  const { commu_faq, readPost } = usePostStore();

  useEffect(() => {
    if (commu_faq.length === 0) {
      readPost("commu_faq");
    }
  }, [commu_faq, readPost]);

  useEffect(() => {
    if (commu_faq.length > 0) {
      const items = document.querySelectorAll(".faq-items");

      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        setTimeout(() => {
          item.classList.add("show");
        }, 50);
      });
    }
  }, [commu_faq]);

  return (
    <>
      <title>StarScope FAQ</title>
      <h1 className="a11y-hidden">StarScope FAQ</h1>
      <FaqList>
        <ul>
          {commu_faq?.map((faq) => (
            <li key={faq?.id} className="faq-items">
              <div>
                <Sparkles />
                <h2>{faq?.title}</h2>
              </div>
              <p>{faq?.content}</p>
            </li>
          ))}
        </ul>
      </FaqList>
    </>
  );
}

const FaqList = styled(GridWrap)`
  margin-top: 4rem;
  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    background-color: var(--white-color);
    padding: 2rem;
  }

  & .faq-items {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  & .faq-items.show {
    opacity: 1;
    transform: translateX(0);
  }
  & li ~ li {
    margin-top: 2rem;
  }
  & li > div {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  & svg {
    width: 1.4rem;
  }
  & h2 {
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }
  & p {
    font-size: var(--font-sz);
    margin-top: 2rem;
  }
`;
