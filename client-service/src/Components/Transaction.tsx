import { useEffect, useState } from "react";
import axios from "axios";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function Transaction() {
  const [total, setTotal] = useState<number>(0);
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);

  const [history, setHistory] = useState([]);

  const userId = sessionStorage.getItem("userId");

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

  const handleSubmit = () => {
    const totalVal = input1 + input2;
    setTotal(totalVal);

    axios.post(
      `http://localhost:4000/api/transaction/history`,
      {
        history: {
          date: new Date(),
          value: `${input1} + ${input2} = ${totalVal}`,
        },
      },
      { headers: { "x-user-id": userId } }
    );
  };

  const time = (timestamp: Date) => {
    const ISTTimestamp = dayjs(timestamp).tz("Asia/Kolkata");

    // Format the timestamp to 12-hour format
    const formattedTime = ISTTimestamp.format("hh:mm A");

    return formattedTime;
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

        <div>
          <h2>Result: {total} </h2>
        </div>
        <div>
          <h2>History: </h2>
          {history.map((h) => (
            <div>
              <span style={{ paddingRight: "10px" }}>
                {time(new Date(h.date))}
              </span>
              <span>{h.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Transaction;
