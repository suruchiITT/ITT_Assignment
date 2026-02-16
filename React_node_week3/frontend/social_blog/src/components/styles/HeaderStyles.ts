import styled from "styled-components";

export const HeaderContainer =
styled.div`

  height:60px;

  background:

  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5,
    #42a5f5
  );

  color:white;

  display:flex;

  justify-content:space-between;

  align-items:center;

  padding:0 25px;

  box-shadow:
  0 5px 20px rgba(0,0,0,0.2);

`;



export const Title =
styled.h2`

  cursor:pointer;

  font-weight:600;

  letter-spacing:0.5px;

  transition:0.3s;



  &:hover{

    transform:scale(1.05);

  }

`;



export const ButtonGroup =
styled.div`

  display:flex;

  gap:12px;

`;



export const HeaderButton =
styled.button`

  padding:7px 16px;

  border-radius:8px;

  border:none;

  font-weight:500;

  cursor:pointer;

  background:
  rgba(255,255,255,0.2);

  color:white;

  backdrop-filter:blur(10px);

  transition:0.3s;



  &:hover{

    background:
    rgba(255,255,255,0.3);

    transform:scale(1.05);

  }

`;



export const LogoutButton =
styled(HeaderButton)`

  background:

  linear-gradient(
    135deg,
    #ff4b2b,
    #ff416c
  );

  color:white;



  &:hover{

    transform:scale(1.05);

    box-shadow:
    0 5px 15px rgba(0,0,0,0.3);

  }

`;
