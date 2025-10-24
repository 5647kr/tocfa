import { useEffect } from "react";
import styled from "styled-components";
import usePostStore from "../../../store/postStore";
import { Sparkles } from "lucide-react";

export default function CommuFaq() {
  const { commu_faq, readPost } = usePostStore();

  useEffect(() => {
    if (commu_faq.length === 0) {
      readPost("commu_faq");
    }
  }, [commu_faq, readPost]);

  console.log(commu_faq);
  return (
    <Wrap>
      <title>StarScope FAQ</title>
      <h1 className="a11y-hidden">StarScope FAQ</h1>
      <FaqList>
        <ul>
          {commu_faq?.map((faq) => (
            <li key={faq?.id}>
              <div>
                <Sparkles />
                <h2>{faq?.title}</h2>
              </div>
              <p>{faq?.content}</p>
            </li>
          ))}
        </ul>
      </FaqList>
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

const FaqList = styled.div`
  margin-top: 4rem;
  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    background-color: var(--white-color);
    padding: 2rem;
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
