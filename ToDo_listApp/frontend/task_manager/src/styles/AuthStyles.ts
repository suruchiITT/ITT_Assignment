import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0079bf;
`;

export const AuthCard = styled.form`
  background: #f4f5f7;
  padding: 32px;
  width: 320px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25);
`;

export const Title = styled.h2`
  text-align: center;
  margin: 0;
  color: #172b4d;
  font-size: 20px;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border-radius: 3px;
  border: 2px solid #dfe1e6;
  font-size: 14px;
  background: #fafbfc;
  &:focus {
    outline: none;
    border-color: #0079bf;
  }
`;

export const Button = styled.button`
  padding: 10px;
  background: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #519839;
  }
`;

export const SwitchText = styled.p`
  text-align: center;
  font-size: 12px;
  color: #5e6c84;
  margin: 0;
  a {
    color: #0079bf;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
