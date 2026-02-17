import styled from "styled-components";

export const Container =
styled.div`

  display:flex;
  justify-content:center;
  align-items:center;

  min-height:100vh;

  background:
  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  );

`;



export const Form =
styled.form`

  background:white;

  padding:35px;

  width:400px;

  border-radius:15px;

  box-shadow:
  0 15px 35px rgba(0,0,0,0.2);

  display:flex;
  flex-direction:column;

`;



export const Title =
styled.h2`

  text-align:center;

  margin-bottom:20px;

  color:#333;

`;



export const Input =
styled.input`

  width:100%;

  padding:12px;

  margin-bottom:15px;

  border-radius:8px;

  border:1px solid #ddd;

  font-size:14px;

  outline:none;

  transition:0.3s;

  &:focus{

    border-color:#7873f5;

  }

`;



export const Button =
styled.button`

  width:100%;

  padding:12px;

  border:none;

  border-radius:8px;

  background:
  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  );

  color:white;

  font-weight:600;

  cursor:pointer;

  margin-top:5px;

  transition:0.3s;

  &:hover{

    transform:translateY(-2px);

    box-shadow:
    0 8px 20px rgba(0,0,0,0.2);

  }

`;



export const LinkText =
styled.p`

  margin-top:15px;

  text-align:center;

  color:#7873f5;

  cursor:pointer;

`;



export const ErrorMessage =
styled.div`

  background:#ffe6e6;

  color:#d8000c;

  padding:10px;

  border-radius:8px;

  margin-bottom:10px;

  font-size:14px;

`;



export const SuccessMessage =
styled.div`

  background:#e6ffe6;

  color:#2e7d32;

  padding:10px;

  border-radius:8px;

  margin-bottom:10px;

  font-size:14px;

`;
