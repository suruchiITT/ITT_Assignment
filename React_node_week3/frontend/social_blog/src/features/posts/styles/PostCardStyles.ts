import styled from "styled-components";

export const Card =
styled.div`

  width:600px;

  margin:20px auto;

  padding:20px;

  border-radius:16px;

  background:
  rgba(255,255,255,0.9);

  backdrop-filter:blur(20px);

  border:
  1px solid rgba(0,0,0,0.1);

  box-shadow:
  0 8px 32px rgba(0,0,0,0.15);

  color:black;

`;



export const Author =
styled.div`

  font-weight:600;

  font-size:15px;

  margin-bottom:10px;

  color:#333;

`;



export const Title =
styled.h3`

  margin-bottom:8px;

  font-weight:600;

  color:black;

`;



export const Content =
styled.p`

  margin-bottom:10px;

  line-height:1.5;

  color:#222;

`;



export const Image =
styled.img`

  width:100%;

  border-radius:12px;

  margin-top:10px;

  box-shadow:
  0 4px 15px rgba(0,0,0,0.2);

`;



export const ButtonRow =
styled.div`

  display:flex;

  gap:10px;

  margin-top:15px;

`;



export const Button =
styled.button`

  padding:8px 14px;

  border-radius:8px;

  border:none;

  font-size:14px;

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

    transform:scale(1.05);

    box-shadow:
    0 5px 15px rgba(0,0,0,0.3);

  }

`;



export const EditInput =
styled.input`

  width:100%;

  height:40px;

  padding:0 10px;

  border-radius:8px;

  border:1px solid #ccc;

  background:white;

  color:black;

  margin-bottom:10px;

  outline:none;

`;



export const EditTextarea =
styled.textarea`

  width:100%;

  height:100px;

  padding:10px;

  border-radius:8px;

  border:1px solid #ccc;

  background:white;

  color:black;

  margin-bottom:10px;

  outline:none;

  resize:none;

`;
