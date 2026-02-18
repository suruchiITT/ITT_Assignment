import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f6fb;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e0e0e0;
  padding: 60px;

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 40px 20px;
  }

  @media (max-width: 500px) {
    padding: 30px 15px;
  }
`;

export const Quote = styled.h1`
  font-size: 42px;
  text-align: center;
  max-width: 650px;
  margin-bottom: 60px;
  line-height: 1.3;

  background: linear-gradient(135deg, #4b4376, #6c63ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 900px) {
    font-size: 32px;
    margin-bottom: 40px;
  }

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 420px;
  height: 280px;

  @media (max-width: 900px) {
    width: 320px;
    height: 220px;
  }

  @media (max-width: 500px) {
    width: 260px;
    height: 180px;
  }
`;

export const FloatingImage = styled.img`
  width: 240px;
  height: 170px;
  object-fit: cover;
  border-radius: 14px;
  position: absolute;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
    z-index: 10;
  }

  &:nth-child(1) {
    top: 0;
    left: 60px;
    opacity: 0.9;
  }

  &:nth-child(2) {
    top: 60px;
    left: 0;
  }

  &:nth-child(3) {
    top: 60px;
    left: 140px;
  }

  @media (max-width: 900px) {
    width: 180px;
    height: 130px;
  }

  @media (max-width: 500px) {
    width: 140px;
    height: 100px;
  }
`;

export const RightSection = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    padding: 30px 15px;
  }
`;

export const FormContainer = styled.div`
  width: 380px;
  padding: 40px;

  @media (max-width: 500px) {
    width: 100%;
    padding: 20px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-size: 26px;
  color: #4b4376;

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 14px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;

  &:focus {
    border-color: #6c63ff;
  }

  @media (max-width: 500px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #4b4376;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: black;
  }

  @media (max-width: 500px) {
    padding: 12px;
  }
`;

export const LinkText = styled.p`
  margin-top: 18px;
  text-align: center;
  color: #6c63ff;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  background: #ffe6e6;
  color: red;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const SuccessMessage = styled.div`
  background: #e6ffe6;
  color: green;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const fadeWord = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6fb;
  padding: 20px;
`;

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterQuote = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
  max-width: 600px;
  line-height: 1.4;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

export const Word = styled.span<{ delay: number }>`
  opacity: 0;
  display: inline-block;
  margin-right: 6px;

  background: linear-gradient(135deg, #4b4376, #6c63ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${fadeWord} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

export const RegisterCard = styled.div`
  width: 420px;
  padding: 40px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);

  @media (max-width: 500px) {
    width: 100%;
    padding: 25px;
  }
`;
