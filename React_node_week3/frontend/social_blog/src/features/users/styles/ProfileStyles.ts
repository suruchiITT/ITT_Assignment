import styled from "styled-components";

export const PageContainer =
styled.div`

  display:flex;

  justify-content:center;

  min-height:100vh;

  padding-top:40px;

  background:

  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5,
    #42a5f5
  );

`;



export const Container =
styled.div`

  width:900px;

  background:
  rgba(255,255,255,0.95);

  border-radius:18px;

  padding:20px;

  box-shadow:
  0 15px 40px rgba(0,0,0,0.15);

`;



export const Header =
styled.div`

  display:flex;

  gap:60px;

  padding:20px;

  align-items:center;

`;



export const ProfileImage =
styled.img`

  width:150px;
  height:150px;

  border-radius:50%;

  object-fit:cover;

  border:4px solid transparent;

  background:

  linear-gradient(white, white) padding-box,

  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  ) border-box;

  box-shadow:
  0 5px 15px rgba(0,0,0,0.2);

`;



export const UserSection =
styled.div`

  display:flex;

  flex-direction:column;

  gap:15px;

`;



export const UsernameRow =
styled.div`

  display:flex;

  align-items:center;

  gap:15px;

`;



export const Username =
styled.h2`

  font-weight:600;

  color:black;

`;



export const EditButton =
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



export const StatsRow =
styled.div`

  display:flex;

  gap:30px;

`;



export const Stat =
styled.div`

  cursor:pointer;

  font-size:15px;

  color:black;

  transition:0.2s;



  &:hover{

    color:#7873f5;

  }

`;



export const Bold =
styled.span`

  font-weight:600;

`;



export const Bio =
styled.div`

  margin-top:10px;

  color:#333;

`;



export const Divider =
styled.hr`

  border:none;

  border-top:1px solid rgba(0,0,0,0.1);

  margin-top:20px;

`;



export const PostGrid =
styled.div`

  display:grid;

  grid-template-columns:
  repeat(3,1fr);

  gap:15px;

  padding:20px;

`;



export const PostImage =
styled.img`

  width:100%;

  height:250px;

  object-fit:cover;

  border-radius:12px;

  cursor:pointer;

  transition:0.3s;



  &:hover{

    transform:scale(1.05);

    box-shadow:
    0 8px 20px rgba(0,0,0,0.3);

  }

`;
