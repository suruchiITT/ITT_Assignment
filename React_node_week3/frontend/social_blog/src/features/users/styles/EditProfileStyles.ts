import styled from "styled-components";

export const Page =
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

  width:500px;

  background:
  rgba(255,255,255,0.95);

  padding:35px;

  border-radius:18px;

  box-shadow:
  0 15px 40px rgba(0,0,0,0.15);

  border:
  1px solid rgba(0,0,0,0.08);

`;



export const Header =
styled.div`

  display:flex;

  align-items:center;

  gap:20px;

  margin-bottom:25px;

`;



export const ProfileImageWrapper =
styled.label`

  position:relative;

  cursor:pointer;

`;



export const ProfileImage =
styled.img`

  width:120px;
  height:120px;

  border-radius:50%;

  object-fit:cover;

  border:3px solid transparent;

  background:

  linear-gradient(white, white) padding-box,

  linear-gradient(
    135deg,
    #ff6ec4,
    #7873f5
  ) border-box;

`;



export const CameraOverlay =
styled.div`

  position:absolute;

  bottom:0;

  width:100%;

  background:
  rgba(0,0,0,0.6);

  color:white;

  font-size:13px;

  text-align:center;

  padding:6px;

  border-radius:
  0 0 50% 50%;

  opacity:0;

  transition:0.3s;

  font-weight:500;

  ${ProfileImageWrapper}:hover & {

    opacity:1;

  }

`;



export const Username =
styled.h2`

  margin:0;

  font-weight:600;

  color:#222;

`;



export const Email =
styled.p`

  margin:5px 0;

  color:#666;

  font-size:14px;

`;



export const Form =
styled.form`

  display:flex;

  flex-direction:column;

  gap:15px;

`;



export const Label =
styled.label`

  font-weight:500;

  color:#333;

`;



export const Input =
styled.input`

  height:45px;

  padding:0 12px;

  border:1px solid #ddd;

  border-radius:10px;

  font-size:15px;

  outline:none;

  transition:0.2s;



  &:focus{

    border-color:#7873f5;

    box-shadow:
    0 0 5px rgba(120,115,245,0.3);

  }

`;



export const SaveButton =
styled.button`

  height:45px;

  border:none;

  border-radius:10px;

  font-size:16px;

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

    transform:scale(1.03);

    box-shadow:
    0 8px 20px rgba(0,0,0,0.2);

  }

`;
