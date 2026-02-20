import styled from "styled-components";

export const Wrapper = styled.div`
display:flex;
height:100vh;
width:100%;
`;

export const Left = styled.div`
width:50%;
background:linear-gradient(135deg,#4338ca,#1e293b);
color:white;
display:flex;
flex-direction:column;
justify-content:center;
padding:80px;
gap:24px;
`;

export const Logo = styled.div`
font-size:18px;
font-weight:600;
`;

export const Heading = styled.div`
font-size:36px;
font-weight:700;
line-height:1.2;
`;

export const Text = styled.div`
opacity:0.85;
max-width:420px;
line-height:1.6;
`;

export const Right = styled.div`
width:50%;
display:flex;
justify-content:center;
align-items:center;
background:#f8fafc;
`;

export const FormContainer = styled.div`
width:100%;
max-width:380px;
display:flex;
flex-direction:column;
gap:14px;
`;

export const Title = styled.div`
font-size:22px;
font-weight:700;
margin-bottom:4px;
`;

export const Input = styled.input`
padding:14px;
border:none;
border-radius:8px;
background:#e2e8f0;
outline:none;
`;

export const SwitchText = styled.div`
text-align:center;
margin-top:6px;
color:#64748b;
`;

export const LinkText = styled.span`
color:#4338ca;
cursor:pointer;
font-weight:600;
`;
