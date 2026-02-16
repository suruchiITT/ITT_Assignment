import styled from "styled-components";

export const Card =
styled.div`

  background:
  rgba(255,255,255,0.95);

  padding:15px 20px;

  margin:10px 0;

  border-radius:12px;

  display:flex;

  justify-content:space-between;

  align-items:center;

  border:1px solid rgba(0,0,0,0.08);

  box-shadow:
  0 5px 15px rgba(0,0,0,0.1);

  transition:0.3s;



  &:hover{

    transform:translateY(-2px);

    box-shadow:
    0 10px 25px rgba(0,0,0,0.15);

  }

`;



export const Name =
styled.h4`

  margin:0;

  font-weight:600;

  color:black;

`;



export const Button =
styled.button`

  padding:6px 14px;

  border-radius:8px;

  border:none;

  font-weight:500;

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
    0 5px 15px rgba(0,0,0,0.2);

  }

`;
