import styled from "styled-components";



export const Container =
styled.div`

  padding:30px;

`;



export const Title =
styled.h2`

  margin-bottom:25px;

  font-weight:600;

  font-size:22px;

  color:#111;

`;



export const Grid =
styled.div`

  display:grid;

  grid-template-columns:
  repeat(auto-fill,minmax(250px,1fr));

  gap:20px;

`;
