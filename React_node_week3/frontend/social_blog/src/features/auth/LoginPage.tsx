import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";

import { loginUser } from "./authSlice";

import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";

import {
  Container,
  LeftSection,
  RightSection,
  Quote,
  ImageContainer,
  FloatingImage,
  FormContainer,
  Form,
  Title,
  Input,
  Button,
  LinkText,
  ErrorMessage,
  SuccessMessage,
} from "./styles/AuthFormStyles";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");

    setSuccess("");

    if (!email || !password) {
      setError("Email and password required");

      return;
    }

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      setSuccess("Login successful");

      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Container>
      <LeftSection>
        <Quote>
          Your thoughts deserve a place in the world. Start writing.
        </Quote>

        <ImageContainer>
          <FloatingImage src={blog1} />

          <FloatingImage src={blog2} />

          <FloatingImage src={blog3} />
        </ImageContainer>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <Title>Log in to Social Blogging</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Log in</Button>
          </Form>

          <LinkText onClick={() => navigate("/register")}>
            Create new account
          </LinkText>
        </FormContainer>
      </RightSection>
    </Container>
  );
}
