import { useState } from "react";
import { loginUser } from "../api/api";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailAddress)) {
      setErrorText("Enter a valid email");
      return;
    }

    if (!passwordValue) {
      setErrorText("Password is required");
      return;
    }

    try {
      const response = await loginUser(emailAddress, passwordValue);
      localStorage.setItem("token", response.token);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorText("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>Login</h2>

        <ErrorMessage messageText={errorText} />

        <input
          placeholder="Email"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(event) => setPasswordValue(event.target.value)}
        />

        <button type="submit">Login</button>

        <p style={{ textAlign: "center" }}>
          New user? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
