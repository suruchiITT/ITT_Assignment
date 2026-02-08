import { Router } from "express";
import { loginAccount, registerAccount } from "../controllers/auth.controller.js";

const authenticationRouter = Router();

authenticationRouter.post("/register", registerAccount);
authenticationRouter.post("/login", loginAccount);

export default authenticationRouter;
