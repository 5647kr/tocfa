import styled from "styled-components";

const AdminSectionWrap = styled.section`
  grid-column: 1 / -1;
  padding-block: 6rem;
  & > div {
    height: calc(100vh - 18rem);
  }
  @media screen and (min-width: 769px) {
    grid-column: 3 / -1;
    & > div {
      height: calc(100vh - 12rem);
    }
  }
`;

export default AdminSectionWrap;
