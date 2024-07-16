import Course from "../models/courseModel.js";
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import AppError from "../utils/appError.js";

/**
 * @ALL_COURSES
 * @ROUTE @GET {{URL}}/api/v1/courses
 * @ACCESS Public
 */

export const getAllCourses = asyncHandler(async (_req, res, next) => {
  // Find all the courses without lectures
  const courses = await Course.find({}).select("-lectures");

  res.status(200).json({
    success: true,
    message: "All courses",
    courses,
  });
});

/**
 * @GET_LECTURES_BY_COURSE_ID
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private(ADMIN, subscribed users only)
 */

export const getLecturesByCourseId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course lectures fetched successfully",
    lectures: course.lectures,
  });
});
