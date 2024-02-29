import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
  console.log(`method=${req.method} route=${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Transaction Server is Running at Port ${port}`);
});
