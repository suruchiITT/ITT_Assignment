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
    #7873f5,
    #42a5f5
  );

`;



export const Card =
styled.div`

  width:450px;

  padding:30px;

  border-radius:16px;

  background:

  rgba(255,255,255,0.15);

  backdrop-filter:blur(20px);

  border:

  1px solid rgba(255,255,255,0.3);

  box-shadow:

  0 8px 32px rgba(0,0,0,0.2);

`;



export const Input =
styled.input`

  width:100%;

  height:45px;

  padding:0 12px;

  margin-top:12px;

  border-radius:8px;

  border:

  1px solid rgba(255,255,255,0.4);

  background:

  rgba(255,255,255,0.2);

  color:white;

  font-size:15px;

  outline:none;

  box-sizing:border-box;



  &::placeholder{

    color:#f1f1f1;

  }



  &:focus{

    border:1px solid white;

    background:

    rgba(255,255,255,0.3);

  }

`;



export const Textarea =
styled.textarea`

  width:100%;

  height:120px;

  padding:12px;

  margin-top:12px;

  border-radius:8px;

  border:

  1px solid rgba(255,255,255,0.4);

  background:

  rgba(255,255,255,0.2);

  color:white;

  font-size:15px;

  outline:none;

  resize:none;

  box-sizing:border-box;



  &::placeholder{

    color:#f1f1f1;

  }

`;



export const Button =
styled.button`

  width:100%;

  height:45px;

  margin-top:18px;

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

    transform:scale(1.03);

    box-shadow:

    0 6px 20px rgba(0,0,0,0.3);

  }

`;
