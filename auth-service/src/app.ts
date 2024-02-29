import express, { Request, Response, Application } from "express";
import dbConnect from "./config/connection";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

//For env File
dotenv.config();

import Proxy from "./routes/proxy";

const app: Application = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

dbConnect((err) => {
  if (err) {
    console.log("Database Connection Error:" + err);
  } else {
    console.log("Database Connected Successfully");
  }
});

app.use(function (req, res, next) {
  console.log(`method=${req.method} route=${req.url}`);
  next();
});

app.use(Proxy);

app.listen(port, () => {
  console.log(`Auth Server is Running at Port ${port}`);
});
