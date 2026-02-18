import styled from "styled-components";

export const Card =
styled.div`

  width:100%;

  max-width:650px;

  margin:20px auto;

  padding:20px;

  border-radius:16px;

  background:white;

  border:1px solid #e5e7eb;

  box-shadow:
  0 8px 24px rgba(0,0,0,0.08);

  color:#111827;

  transition:0.25s;

  box-sizing:border-box;

  &:hover{

    box-shadow:
    0 12px 32px rgba(0,0,0,0.15);

  }

  @media (max-width:768px){

    padding:16px;

    margin:16px auto;

  }

  @media (max-width:480px){

    padding:14px;

    border-radius:12px;

  }

`;

export const Author =
styled.div`

  font-weight:600;

  font-size:15px;

  margin-bottom:8px;

  color:#374151;

  @media (max-width:480px){

    font-size:14px;

  }

`;

export const Title =
styled.h3`

  margin-bottom:6px;

  font-weight:700;

  color:#111827;

  font-size:18px;

  @media (max-width:480px){

    font-size:16px;

  }

`;

export const Content =
styled.p`

  margin-bottom:10px;

  line-height:1.6;

  color:#374151;

  font-size:15px;

  @media (max-width:480px){

    font-size:14px;

  }

`;

export const Image =
styled.img`

  width:100%;

  max-height:450px;

  object-fit:cover;

  border-radius:12px;

  margin-top:10px;

  box-shadow:
  0 6px 18px rgba(0,0,0,0.15);

  @media (max-width:480px){

    max-height:300px;

  }

`;

export const ButtonRow =
styled.div`

  display:flex;

  flex-wrap:wrap;

  gap:10px;

  margin-top:15px;

`;

export const Button =
styled.button`

  padding:8px 16px;

  border-radius:8px;

  border:none;

  font-size:14px;

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
    0 6px 18px rgba(0,0,0,0.2);

    background:
    linear-gradient(
      135deg,
      #3b3360,
      #5a52d6
    );

  }

  @media (max-width:480px){

    font-size:13px;

    padding:7px 12px;

  }

`;

export const EditInput =
styled.input`

  width:100%;

  height:42px;

  padding:0 12px;

  border-radius:8px;

  border:1px solid #e5e7eb;

  background:white;

  color:#111827;

  margin-bottom:10px;

  outline:none;

  font-size:14px;

  box-sizing:border-box;

  &:focus{

    border-color:#6c63ff;

    box-shadow:
    0 0 0 3px rgba(108,99,255,0.15);

  }

`;

export const EditTextarea =
styled.textarea`

  width:100%;

  height:110px;

  padding:10px;

  border-radius:8px;

  border:1px solid #e5e7eb;

  background:white;

  color:#111827;

  margin-bottom:10px;

  outline:none;

  resize:none;

  font-size:14px;

  box-sizing:border-box;

  &:focus{

    border-color:#6c63ff;

    box-shadow:
    0 0 0 3px rgba(108,99,255,0.15);

  }

`;
