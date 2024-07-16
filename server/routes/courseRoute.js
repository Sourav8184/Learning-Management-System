import Router from "express";
import {
  getAllCourses,
  getLecturesByCourseId,
} from "../controllers/courseControllers.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(isLoggedIn, getLecturesByCourseId);

export default router;
