import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width:40px;
  height:40px;
  border:4px solid #e2e8f0;
  border-top-color:#2563eb;
  border-radius:50%;
  animation:${spin} 1s linear infinite;
  margin:20px auto;
`;
