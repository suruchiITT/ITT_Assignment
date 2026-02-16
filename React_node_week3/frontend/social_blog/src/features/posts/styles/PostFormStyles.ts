import styled from "styled-components";

export const Form =
styled.form`

  width:600px;

  margin:20px auto;

  padding:20px;

  background:white;

  border-radius:16px;

  border:1px solid rgba(0,0,0,0.1);

  box-shadow:
  0 8px 25px rgba(0,0,0,0.1);

  display:flex;

  flex-direction:column;

  gap:12px;

`;



export const Input =
styled.input`

  width:100%;

  height:45px;

  padding:0 12px;

  border-radius:8px;

  border:1px solid #ccc;

  font-size:15px;

  outline:none;

  box-sizing:border-box;

  transition:0.2s;



  &:focus{

    border-color:#7873f5;

    box-shadow:
    0 0 5px rgba(120,115,245,0.3);

  }

`;



export const Button =
styled.button`

  width:100%;

  height:45px;

  border-radius:8px;

  border:none;

  font-size:16px;

  font-weight:600;

  cursor:pointer;

  background:
  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  );

  color:white;

  transition:0.3s;



  &:hover{

    transform:scale(1.02);

    box-shadow:
    0 5px 15px rgba(0,0,0,0.2);

  }

`;
