import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
`;

export const AuthCard = styled.form`
  background: #ffffff;
  padding: 40px;
  width: 380px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const Button = styled.button`
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #2563eb;
  }
`;

export const SwitchText = styled.p`
  text-align: center;
  font-size: 14px;
`;
