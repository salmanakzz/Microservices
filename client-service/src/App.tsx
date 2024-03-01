import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";

import Transaction from "./Components/Transaction";
import PasswordChange from "./Components/PasswordChange";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<PasswordChange />} path="/password_change" />
        <Route element={<Transaction />} path="/transaction" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
