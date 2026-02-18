import styled from "styled-components";

export const Page =
styled.div`

  display:flex;

  justify-content:center;

  align-items:center;

  min-height:100vh;

  background:white;

`;

export const Card =
styled.div`

  width:500px;

  background:white;

  padding:35px;

  border-radius:18px;

  box-shadow:
  0 10px 30px rgba(0,0,0,0.08);

  border:
  1px solid #e5e7eb;

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
    #4b4376,
    #6c63ff
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

  font-weight:700;

  color:#111827;

`;

export const Email =
styled.p`

  margin:5px 0;

  color:#6b7280;

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

  font-weight:600;

  color:#374151;

`;

export const Input =
styled.input`

  height:45px;

  padding:0 12px;

  border:1px solid #e5e7eb;

  border-radius:10px;

  font-size:15px;

  outline:none;

  transition:0.2s;

  &:focus{

    border-color:#6c63ff;

    box-shadow:
    0 0 0 3px rgba(108,99,255,0.15);

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
    #4b4376,
    #6c63ff
  );

  transition:0.25s;

  &:hover{

    transform:translateY(-2px);

    background:

    linear-gradient(
      135deg,
      #3b3360,
      #5a52d6
    );

    box-shadow:
    0 8px 20px rgba(0,0,0,0.15);

  }

`;
