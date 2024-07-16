import Router from "express";
import {
  getAllCourses,
  createCourse,
  updateCourseById,
  getLecturesByCourseId,
} from "../controllers/courseControllers.js";
import upload from "../middleware/multerMiddleware.js";
import {
  isLoggedIn,
  authorizeRoles,
  authorizeSubscribers,
} from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

router
  .route("/:id")
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId)
  .put(isLoggedIn, authorizeRoles("ADMIN"), updateCourseById);

export default router;
