import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin-top: auto;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 4px 10px;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background: ${(props) => (props.active ? "#0079bf" : "white")};
  color: ${(props) => (props.active ? "white" : "#172b4d")};
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? "#026aa7" : "#f4f5f7")};
  }
`;

export const PageInfo = styled.span`
  font-size: 12px;
  color: #172b4d;
  font-weight: 500;
`;
