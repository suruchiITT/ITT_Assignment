import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";

import { registerUser } from "./authSlice";

import {

  Container,
  Form,
  Title,
  Input,
  Button,
  LinkText

} from "./styles/AuthFormStyles";

export default function RegisterPage(){

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [profilePic, setProfilePic] =
    useState<File | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if(profilePic){

      formData.append(
        "profilePic",
        profilePic
      );

    }

    const result = await dispatch(
      registerUser(formData)
    );

    if(registerUser.fulfilled.match(result)){

      setSuccess("User created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);

    } else if(registerUser.rejected.match(result)){

      setError(result.payload ? String(result.payload) : "Registration failed");

    }

  };

  return(

    <Container>

      <Form onSubmit={handleSubmit}>

        <Title>
          Register
        </Title>

        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}

        <Input
          placeholder="Username"
          value={username}
          onChange={(e)=>
            setUsername(e.target.value)
          }
        />

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

        <Input
          type="file"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) =>
            setProfilePic(
              e.target.files?.[0] || null
            )
          }
        />

        <Button type="submit">
          Register
        </Button>

        <LinkText
        onClick={() =>
          navigate("/login")
        }>
          Already registered? Login
        </LinkText>

      </Form>

    </Container>

  );

}
