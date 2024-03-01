import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (email) {
      const { data } = await axios.post(
        `http://localhost:4000/api/user/login`,
        {
          email,
          password,
        }
      );

      if (data.data._id) {
        sessionStorage.setItem("userId", data.data._id);
        navigate("/transaction");
      }
    }
  };
  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <div>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="">Email</label>
          </div>
          <input
            type="email"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="">Password</label>
          </div>
          <input
            type="password"
            name="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ paddingTop: "20px" }}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div
        style={{
          paddingTop: "20px",
          color: "yellow",
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: "12px",
        }}
        onClick={() => navigate("/password_change")}
      >
        <span>Password Change</span>
      </div>
    </div>
  );
};

export default Login;
