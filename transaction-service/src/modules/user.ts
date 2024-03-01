import express from "express";
import {
  changePassword,
  getSingleUser,
  userLogin,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/api/user/login", userLogin);

router.post("/api/user/password/change", changePassword);

router.get("/api/user", getSingleUser);

export default router;
