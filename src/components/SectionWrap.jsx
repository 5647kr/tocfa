import styled from "styled-components";

const FullWrap = styled.section`
  grid-column: 1 / -1;
`;

const GridWrap = styled.section`
  grid-column: 1 / -1;

  @media screen and (min-width: 481px) and (max-width: 768px) {
    grid-column: 2 / -2;
  }

  @media screen and (min-width: 769px) {
    grid-column: 3 / -3;
  }
`;

export { FullWrap, GridWrap };
