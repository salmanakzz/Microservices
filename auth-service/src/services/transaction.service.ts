import { Request, Response } from "express";
import axios from "axios";

const TRANSACTION_BASE_URL = "http://localhost:5000";

export const TransationService = async (req: Request, res: Response) => {
  try {
    const url = TRANSACTION_BASE_URL + req.originalUrl;
    const response = await axios({
      method: req.method,
      url,
      data: req.body, // Pass request body
      params: req.query, // Pass query parameters
      headers: req.headers, // Pass headers
    });

    // Forward the response from the transaction server back to the auth
    res.status(response.status).send(response.data);
  } catch (error: any) {
    if (error.response) {
      // If the error is from the transaction server, forward its status and response
      res.status(error.response.status).send(error.response.data);
    } else {
      // If it's an unexpected error (e.g., network error), handle it accordingly
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};
