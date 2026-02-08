import { useState } from "react";
import { registerUser } from "../api/api";
import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{7,}$/;

    if (!emailPattern.test(emailAddress)) {
      setErrorText("Enter a valid email");
      return;
    }

    if (!passwordPattern.test(passwordValue)) {
      setErrorText(
        "Password must be 7 chars with letter, number & special char"
      );
      return;
    }

    try {
      await registerUser(fullName, emailAddress, passwordValue);
      window.location.href = "/";
    } catch (error: any) {
      setErrorText("Email already registered");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>Register</h2>

        <ErrorMessage messageText={errorText} />

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

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

        <button type="submit">Register</button>

        <p style={{ textAlign: "center" }}>
          Already registered? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
