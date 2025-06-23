import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js"

const router = Router();

// user register controller
router.route("/register").post(registerUser);

export { router }