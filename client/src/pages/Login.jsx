import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forms.css";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthValue();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setError("");

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // If response is not ok, throw an error
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await response.json();
      // Store the JWT token in local storage
      login(data.token, data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      // Update the UI to show the error
      setError(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Log in</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={handleLogin} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <p>
          {`Don't have an account? `}
          <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
}
