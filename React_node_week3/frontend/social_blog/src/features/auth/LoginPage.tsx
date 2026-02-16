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
  LinkText

} from "./styles/AuthFormStyles";

export default function LoginPage(){

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const result = await dispatch(
      loginUser({
        email,
        password
      })
    );

    if(loginUser.fulfilled.match(result)){

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);

    } else if(loginUser.rejected.match(result)){

      setError(result.payload ? String(result.payload) : "Login failed");

    }

  };

  return(

    <Container>

      <Form onSubmit={handleSubmit}>

        <Title>
          Login
        </Title>

        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}

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

        <LinkText
        onClick={() =>
          navigate("/register")
        }>
          New User? Register
        </LinkText>

      </Form>

    </Container>

  );

}
