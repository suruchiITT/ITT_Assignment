import styled from "styled-components";



export const Form =
styled.form`

  background:white;

  padding:25px;

  border-radius:16px;

  box-shadow:
  0 8px 25px rgba(0,0,0,0.08);

  display:flex;

  flex-direction:column;

  gap:15px;

  max-width:600px;

  margin:20px auto;

`;



export const Input =
styled.input`

  width:100%;

  padding:12px 14px;

  border-radius:10px;

  border:1px solid #ddd;

  font-size:15px;

  outline:none;

  transition:0.3s;

  color:#111;

  background:#fafafa;



  &:focus{

    border-color:#7873f5;

    background:white;

    box-shadow:
    0 0 0 3px rgba(120,115,245,0.1);

  }

`;



export const Button =
styled.button`

  width:100%;

  padding:12px;

  border-radius:10px;

  border:none;

  font-size:15px;

  font-weight:600;

  cursor:pointer;

  color:white;

  background:

  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  );

  transition:0.3s;



  &:hover{

    transform:translateY(-1px);

    box-shadow:
    0 8px 20px rgba(0,0,0,0.15);

  }



  &:active{

    transform:scale(0.98);

  }

`;



export const Message =
styled.div`

  padding:10px 14px;

  border-radius:10px;

  font-weight:500;

  font-size:14px;

  background:

  linear-gradient(
    135deg,
    #d4edda,
    #c3e6cb
  );

  color:#155724;

  border:1px solid #c3e6cb;

`;
