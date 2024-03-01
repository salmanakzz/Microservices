import express, { Request, Response, Application, NextFunction } from "express";
import dbConnect from "./config/connection";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

//For env File
dotenv.config();

import Proxy from "./routes/proxy";
import UserAuthRoutes from "./routes/user.auth";

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

app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(`method=${req.method} route=${req.url}`);
  next();
});

app.use(Proxy);
app.use(UserAuthRoutes);

app.listen(port, () => {
  console.log(`Auth Server is Running at Port ${port}`);
});
