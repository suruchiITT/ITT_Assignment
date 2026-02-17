import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";

import { loginUser } from "./authSlice";

import {

  Container,
  Form,
  Title,
  Input,
  Button,
  LinkText,
  ErrorMessage,
  SuccessMessage

} from "./styles/AuthFormStyles";

export default function LoginPage(){

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [success,setSuccess] = useState("");



  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");



    if(!email || !password){

      setError("Email and password required");

      return;

    }



    const result = await dispatch(
      loginUser({email,password})
    );



    if(loginUser.fulfilled.match(result)){

      setSuccess("Login successful");

      navigate("/");

    }
    else{

      setError("Invalid email or password");

    }

  };



  return(

    <Container>

      <Form onSubmit={handleSubmit}>

        <Title>Login</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}



        <Input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />



        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />



        <Button type="submit">

          Login

        </Button>



        <LinkText onClick={() =>
          navigate("/register")
        }>
          New user? Register
        </LinkText>

      </Form>

    </Container>

  );

}
