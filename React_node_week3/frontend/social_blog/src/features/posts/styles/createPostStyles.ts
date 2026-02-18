import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: center;

  align-items: center;

  min-height: calc(100vh - 74px);

  padding: 20px;

  background: linear-gradient(
    135deg,
    #eef2ff,
    #f8fafc,
    #fdf2f8
  );
`;

export const Card = styled.div`
  width: 100%;

  max-width: 480px;

  padding: 32px;

  border-radius: 18px;

  background: white;

  border: 1px solid #e5e7eb;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);

  @media (max-width: 768px){

    padding: 24px;

  }

  @media (max-width: 480px){

    padding: 18px;

    border-radius: 14px;

  }
`;

export const HeaderText = styled.div`
  margin-bottom: 18px;
`;

export const Title = styled.h2`
  font-size: 24px;

  font-weight: 700;

  color: #4b4376;

  margin-bottom: 6px;

  @media (max-width: 480px){

    font-size: 20px;

  }
`;

export const SubText = styled.div`
  font-size: 14px;

  color: #6b7280;

  @media (max-width: 480px){

    font-size: 13px;

  }
`;

export const Input = styled.input`
  width: 100%;

  height: 45px;

  padding: 0 12px;

  margin-top: 12px;

  border-radius: 10px;

  border: 1px solid #e5e7eb;

  background: #f9fafb;

  color: #111827;

  font-size: 15px;

  font-weight: 600;

  outline: none;

  transition: 0.2s;

  box-sizing: border-box;

  &:focus{
    border-color: #6c63ff;
    background: white;
  }

  @media (max-width: 480px){

    height: 42px;

    font-size: 14px;

  }
`;

export const Textarea = styled.textarea`
  width: 100%;

  height: 120px;

  padding: 12px;

  margin-top: 12px;

  border-radius: 10px;

  border: 1px solid #e5e7eb;

  background: #f9fafb;

  color: #111827;

  font-size: 15px;

  outline: none;

  resize: none;

  transition: 0.2s;

  box-sizing: border-box;

  &:focus{
    border-color: #6c63ff;
    background: white;
  }

  @media (max-width: 480px){

    height: 100px;

    font-size: 14px;

  }
`;

export const FileInput = styled.input`
  margin-top: 14px;

  width: 100%;
`;

export const Button = styled.button`
  width: 100%;

  height: 46px;

  margin-top: 20px;

  border-radius: 10px;

  border: none;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  background: linear-gradient(
    135deg,
    #4b4376,
    #6c63ff
  );

  color: white;

  transition: all 0.25s ease;

  &:hover{

    transform: translateY(-2px);

    background: linear-gradient(
      135deg,
      #3b3360,
      #5a52d6
    );

    box-shadow: 0 8px 20px rgba(0,0,0,0.18);

  }

  @media (max-width: 480px){

    height: 42px;

    font-size: 15px;

  }
`;
