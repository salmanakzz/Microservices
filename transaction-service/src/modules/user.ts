import express from "express";
import { getSingleUser, userLogin } from "../controllers/user.controller";

const router = express.Router();

router.post("/api/user/login", userLogin);

router.get("/api/user", getSingleUser);

export default router;
