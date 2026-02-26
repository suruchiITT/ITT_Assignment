import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthContainer,
  AuthCard,
  Title,
  Input,
  Button,
  SwitchText,
} from "../styles/AuthStyles";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(registerUser(form));
    navigate("/login");
  };

  return (
    <AuthContainer>
      <AuthCard onSubmit={handleSubmit}>
        <Title>Register</Title>

        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit">{loading ? "Loading..." : "Register"}</Button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <SwitchText>
          Already have account? <Link to="/login">Login</Link>
        </SwitchText>
      </AuthCard>
    </AuthContainer>
  );
}
