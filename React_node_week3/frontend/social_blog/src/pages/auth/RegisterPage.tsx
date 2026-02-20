import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../redux/hooks";
import { register } from "../../redux/auth/authSlice";
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

export default function RegisterPage(){

const dispatch=useAppDispatch();
const navigate=useNavigate();

const{error,loading}=useAppSelector(state=>state.auth);

const[username,setUsername]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[localError,setLocalError]=useState("");

const submit=async()=>{

if(loading) return;

if(!username||!email||!password){
setLocalError("All fields required");
return;
}

setLocalError("");

const form=new FormData();

form.append("username",username);
form.append("email",email);
form.append("password",password);

const res:any=await dispatch(register(form));

if(res.meta.requestStatus==="fulfilled"){
navigate("/login",{replace:true});
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

<Logo>Social Blog</Logo>

<Heading>
Share Your Thoughts with the World
</Heading>

<Text>

</Text>

</Left>

<Right>

<FormContainer>

<Title>Register Now</Title>

<StyledInput
placeholder="Username"
value={username}
onChange={e=>setUsername(e.target.value)}
onKeyDown={handleKey}
autoFocus
/>

<StyledInput
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
onKeyDown={handleKey}
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
{loading?"Registering...":"Register"}
</Button>

<SwitchText>
Already User?{" "}
<LinkText onClick={()=>navigate("/login",{replace:true})}>
Login
</LinkText>
</SwitchText>

</FormContainer>

</Right>

</Wrapper>

);

}
