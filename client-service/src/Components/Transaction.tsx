import { useEffect, useState } from "react";
import axios from "axios";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

interface HistoryType {
  date: Date;
  value: string;
}

function Transaction() {
  const [total, setTotal] = useState<number>(0);
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const [error, setError] = useState({
    id: -1,
    value: false,
  });

  const [history, setHistory] = useState<Array<HistoryType>>([]);

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "input1") {
      setInput1(Number(e.target.value));
    } else if (e.target.name === "input2") {
      setInput2(Number(e.target.value));
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/transaction/history`,
      {
        headers: { "x-user-id": userId },
      }
    );

    setHistory(data.data.history.reverse());
  };

  const handleSubmit = async () => {
    const totalVal = input1 + input2;
    setTotal(totalVal);

    const payload = {
      date: new Date(),
      value: `${input1} + ${input2} = ${totalVal}`,
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/transaction/history`,
      {
        history: payload,
      },
      { headers: { "x-user-id": userId } }
    );
    setHistory([payload, ...history]);

    console.log(data);
    if (data.status) {
      setError({ id: -1, value: false });
    } else {
      setError({ id: 0, value: true });
    }
  };

  const time = (timestamp: Date) => {
    const ISTTimestamp = dayjs(timestamp).tz("Asia/Kolkata");

    // Format the timestamp to 12-hour format
    const formattedTime = ISTTimestamp.format("hh:mm A");

    return formattedTime;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  const clearHistory = (idx: number) => {
    setHistory(history.filter((item, id) => id !== idx));
    setError({
      id: -1,
      value: false,
    });
  };

  return (
    <>
      <div>
        <h2>Enter Two Numbers for Add:</h2>
        {Array.from({ length: 2 }).map((_, idx) => (
          <div style={{ paddingBottom: "10px" }}>
            <span style={{ paddingRight: "10px" }}>Number {idx + 1}</span>
            <input
              type="text"
              name={`input` + (idx + 1)}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ))}

        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div>
          <h2>Result: {total} </h2>
        </div>
        <div>
          <h2>History: </h2>
          {history.map((h, idx) => (
            <div>
              <span style={{ paddingRight: "10px" }}>
                {time(new Date(h.date))}
              </span>
              <span>{h.value}</span>
              {error && error.value && error.id === idx && (
                <button onClick={() => clearHistory(idx)}> Clear</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Transaction;
