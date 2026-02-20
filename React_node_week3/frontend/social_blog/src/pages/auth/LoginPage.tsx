import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/auth/authSlice";
import {
Wrapper,
Left,
Right,
FormContainer,
Title,
SwitchText,
LinkText,
Logo,
Heading,
Text
} from "../../styles/auth/AuthStyles";
import { Button } from "../../styles/ui/ButtonStyles";
import { ErrorText } from "../../styles/ui/MessageStyles";
import { StyledInput } from "../../styles/ui/InputStyles";

export default function LoginPage(){

const dispatch=useAppDispatch();
const navigate=useNavigate();

const{error,loading,user}=useAppSelector(state=>state.auth);

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[localError,setLocalError]=useState("");

useEffect(()=>{
if(user){
navigate("/",{replace:true});
}
},[user]);

const submit=async()=>{

if(loading) return;

if(!email||!password){
setLocalError("All fields required");
return;
}

setLocalError("");

const res:any=await dispatch(login({email,password}));

if(res.meta.requestStatus==="fulfilled"){
navigate("/",{replace:true});
}

};

const handleKey=(e:any)=>{
if(e.key==="Enter"){
e.preventDefault();
submit();
}
};

return(

<Wrapper>

<Left>

<Logo>BlogPulse</Logo>

<Heading>
Connect through stories.
</Heading>

<Text>
Login to continue your writing journey.
</Text>

</Left>

<Right>

<FormContainer>

<Title>Login</Title>

<StyledInput
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
onKeyDown={handleKey}
autoFocus
/>

<StyledInput
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
onKeyDown={handleKey}
/>

{localError&&<ErrorText>{localError}</ErrorText>}
{error&&<ErrorText>{error}</ErrorText>}

<Button type="button" onClick={submit}>
{loading?"Logging in...":"Login"}
</Button>

<SwitchText>
New User?{" "}
<LinkText onClick={()=>navigate("/register",{replace:true})}>
Register
</LinkText>
</SwitchText>

</FormContainer>

</Right>

</Wrapper>

);

}
