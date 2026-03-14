import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { registerUser, clearError } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthContainer,
  AuthCard,
  Title,
  Input,
  Button,
  SwitchText,
  ErrorMessage,
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

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(clearError());
    if (user) navigate("/dashboard");
  }, [user, navigate, dispatch]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!form.name || !form.email || !form.password) {
      setLocalError("Please fill all fields");
      return;
    }

    try {
      await dispatch(registerUser(form)).unwrap();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
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

        {localError && <ErrorMessage>{localError}</ErrorMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>

        <SwitchText>
          Already have account? <Link to="/login">Login</Link>
        </SwitchText>
      </AuthCard>
    </AuthContainer>
  );
}
