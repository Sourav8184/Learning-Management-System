import Router from "express";
import {
  getAllCourses,
  createCourse,
  updateCourseById,
  getLecturesByCourseId,
  addLectureToCourseById,
  removeLectureFromCourse,
  deleteCourseById,
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
  )
  .delete(isLoggedIn, removeLectureFromCourse);

router
  .route("/:id")
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId)
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    upload.single("lecture"),
    addLectureToCourseById
  )
  .put(isLoggedIn, authorizeRoles("ADMIN"), updateCourseById)
  .delete(isLoggedIn, authorizeRoles("ADMIN"), deleteCourseById);

export default router;
