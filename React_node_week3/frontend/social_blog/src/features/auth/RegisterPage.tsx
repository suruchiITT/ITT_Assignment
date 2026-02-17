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
  LinkText,
  ErrorMessage,
  SuccessMessage

} from "./styles/AuthFormStyles";

export default function RegisterPage(){

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [username,setUsername] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [profilePic,setProfilePic] =
  useState<File|null>(null);

  const [error,setError] = useState("");

  const [success,setSuccess] = useState("");



  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");



    if(!username || !email || !password){

      setError("All fields except profile image are required");

      return;

    }



    const formData = new FormData();

    formData.append("username",username);
    formData.append("email",email);
    formData.append("password",password);

    if(profilePic){

      formData.append("profilePic",profilePic);

    }



    const result = await dispatch(
      registerUser(formData)
    );



    if(registerUser.fulfilled.match(result)){

      setSuccess("User registered successfully");

      navigate("/login");

    }
    else{

      setError("User already exists or registration failed");

    }

  };



  return(

    <Container>

      <Form onSubmit={handleSubmit}>

        <Title>Register</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}



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
          onChange={(e)=>
            setProfilePic(
              e.target.files?.[0] || null
            )
          }
        />



        <Button type="submit">

          Register

        </Button>



        <LinkText onClick={() =>
          navigate("/login")
        }>
          Already registered? Login
        </LinkText>

      </Form>

    </Container>

  );

}
