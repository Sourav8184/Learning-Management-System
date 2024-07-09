import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserDetails,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isLoggedIn, getLoggedInUserDetails);

export default router;
