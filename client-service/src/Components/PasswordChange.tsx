import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password && newPassword) {
      const { data } = await axios.post(
        `http://localhost:4000/api/user/password/change`,
        {
          email,
          password,
          newPassword,
        }
      );

      if (data.status) {
        navigate("/");
      }
    }
  };
  return (
    <div>
      <div>
        <h3>Password Change</h3>
      </div>
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

      <div>
        <div style={{ textAlign: "left" }}>
          <label htmlFor="">New Password</label>
        </div>
        <input
          type="new_password"
          name="new_password"
          id=""
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div style={{ paddingTop: "20px" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PasswordChange;
