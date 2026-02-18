import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;

  max-width: 1100px;

  margin: 0 auto;
`;

export const Title = styled.h2`
  margin-bottom: 25px;

  font-weight: 700;

  font-size: 26px;

  color: #4b4376;
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(240px, 1fr));

  gap: 28px;

  @media (max-width: 768px){
    grid-template-columns:
      repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px){
    grid-template-columns: 1fr;
  }
`;
