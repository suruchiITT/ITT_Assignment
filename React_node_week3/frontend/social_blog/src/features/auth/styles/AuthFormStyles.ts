import styled from "styled-components";

export const Container =
styled.div`

  display:flex;
  height:100vh;

  justify-content:center;
  align-items:center;

  background:
  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5,
    #42a5f5
  );

`;



export const Form =
styled.form`

  background:rgba(255,255,255,0.15);

  backdrop-filter:blur(20px);

  padding:40px;

  border-radius:16px;

  width:400px;

  border:1px solid rgba(255,255,255,0.3);

  box-shadow:
  0 8px 32px rgba(0,0,0,0.2);

  display:flex;
  flex-direction:column;
  gap:15px;

`;



export const Title =
styled.h2`

  text-align:center;

  color:white;

  margin-bottom:10px;

`;



export const Input =
styled.input`

  width:100%;

  height:45px;

  padding:0 12px;

  border-radius:8px;

  border:1px solid rgba(255,255,255,0.4);

  background:rgba(255,255,255,0.2);

  color:white;

  font-size:15px;

  outline:none;

  box-sizing:border-box;



  &::placeholder{

    color:#f1f1f1;

  }

`;



export const Button =
styled.button`

  width:100%;

  height:45px;

  padding:0 12px;

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

  box-sizing:border-box;

  transition:0.3s;



  &:hover{

    transform:scale(1.02);

  }

`;



export const LinkText =
styled.p`

  text-align:center;

  color:white;

  cursor:pointer;

  font-size:14px;

`;
