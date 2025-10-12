import styled from "styled-components";

const AdminSectionWrap = styled.section`
  grid-column: 1 / -1;
  padding-block: 6rem;
  @media screen and (min-width: 769px) {
    grid-column: 3 / -2;
    min-height: calc(100vh - 12rem);
  }
  & > div {
    min-height: calc(100vh - 18rem);
  }
`;

export default AdminSectionWrap;
