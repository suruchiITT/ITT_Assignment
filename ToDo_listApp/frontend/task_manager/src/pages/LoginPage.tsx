import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthContainer,
  AuthCard,
  Title,
  Input,
  Button,
  SwitchText,
} from "../styles/AuthStyles";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(loginUser(form));
  };

  return (
    <AuthContainer>
      <AuthCard onSubmit={handleSubmit}>
        <Title>Login</Title>

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <SwitchText>
          New User? <Link to="/register">Register</Link>
        </SwitchText>
      </AuthCard>
    </AuthContainer>
  );
}