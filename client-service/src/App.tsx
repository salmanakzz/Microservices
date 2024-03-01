import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";

import Transaction from "./Components/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Transaction />} path="/transaction" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
