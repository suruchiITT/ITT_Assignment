import styled from "styled-components";

export const Card = styled.div`
  background: white;

  border-radius: 18px;

  padding: 28px;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 16px;

  border: 1px solid #e5e7eb;

  box-shadow: 0 8px 24px rgba(0,0,0,0.1);

  transition: 0.3s;

  &:hover{
    transform: translateY(-6px);
    box-shadow: 0 14px 36px rgba(0,0,0,0.18);
  }
`;

export const Avatar = styled.img`
  width: 90px;

  height: 90px;

  border-radius: 50%;

  object-fit: cover;

  border: 4px solid #6c63ff;
`;

export const Name = styled.div`
  font-size: 18px;

  font-weight: 700;

  color: #111827;
`;

export const Button = styled.button<{ $following?: boolean }>`
  padding: 10px 24px;

  border-radius: 10px;

  border: none;

  font-weight: 600;

  font-size: 15px;

  cursor: pointer;

  transition: 0.25s;

  background: ${({ $following }) =>
    $following
      ? "#e5e7eb"
      : "linear-gradient(135deg,#4b4376,#6c63ff)"};

  color: ${({ $following }) =>
    $following
      ? "#111"
      : "white"};

  &:hover{

    transform: translateY(-2px);

    background: ${({ $following }) =>
      $following
        ? "#d1d5db"
        : "linear-gradient(135deg,#3b3360,#5a52d6)"};

  }
`;
