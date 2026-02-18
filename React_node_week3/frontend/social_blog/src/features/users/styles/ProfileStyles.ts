import styled from "styled-components";

export const PageContainer =
styled.div`

  display:flex;

  justify-content:center;

  min-height:100vh;

  padding-top:40px;

  background:white;

`;

export const Container =
styled.div`

  width:900px;

  background:white;

  border-radius:18px;

  padding:20px;

  box-shadow:
  0 10px 30px rgba(0,0,0,0.08);

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
    #4b4376,
    #6c63ff
  ) border-box;

  box-shadow:
  0 5px 15px rgba(0,0,0,0.15);

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

  font-weight:700;

  color:#111827;

`;

export const EditButton =
styled.button`

  padding:8px 18px;

  border-radius:8px;

  border:none;

  font-weight:600;

  cursor:pointer;

  background:
  linear-gradient(
    135deg,
    #4b4376,
    #6c63ff
  );

  color:white;

  transition:0.25s;

  &:hover{

    transform:translateY(-2px);

    box-shadow:
    0 8px 20px rgba(0,0,0,0.15);

    background:
    linear-gradient(
      135deg,
      #3b3360,
      #5a52d6
    );

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

  color:#374151;

  transition:0.2s;

  &:hover{

    color:#6c63ff;

  }

`;

export const Bold =
styled.span`

  font-weight:700;

  color:#111827;

`;

export const Bio =
styled.div`

  margin-top:10px;

  color:#4b5563;

`;

export const Divider =
styled.hr`

  border:none;

  border-top:1px solid #e5e7eb;

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
    0 10px 25px rgba(0,0,0,0.18);

  }

`;
