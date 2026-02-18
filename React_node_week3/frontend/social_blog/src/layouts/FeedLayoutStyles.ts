import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const SidebarArea = styled.div`
  width: 240px;
  background: white;
  border-right: 1px solid #eee;
`;

export const Main = styled.div`
  flex: 1;

  padding: 25px;

  background: linear-gradient(
    135deg,
    #fafafa,
    #f3f4ff,
    #fdf2f8
  );
`;
