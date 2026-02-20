import styled from "styled-components";

export const Container = styled.div`
  background:white;
  border:1px solid #e2e8f0;
  border-radius:8px;
  margin-bottom:20px;
  overflow:hidden;
`;

export const Header = styled.div`
  padding:10px;
  font-weight:bold;
`;

export const Username = styled.div`
  font-size:14px;
`;

export const Image = styled.img`
  width:100%;
`;

export const Content = styled.div`
  padding:10px;
`;

export const Actions = styled.div`
  padding:10px;
  display:flex;
  gap:10px;
`;

export const Button = styled.button`
  background:#2563eb;
  color:white;
  border:none;
  padding:5px 10px;
  border-radius:6px;
  cursor:pointer;
`;

export const CommentInput = styled.input`
  width:100%;
  border:none;
  border-top:1px solid #e2e8f0;
  padding:10px;
`;

export const CommentList = styled.div`
  padding:10px;
`;

export const CommentItem = styled.div`
  font-size:14px;
  margin-bottom:5px;
`;
