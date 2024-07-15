import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserDetails,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isLoggedIn, getLoggedInUserDetails);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

export default router;
