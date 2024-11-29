import { Router } from "express";
import {
  GetCourseById,
  GetCoursesByFilter,
  CreateCourse,
  addVideosToCourse,
  GetNewestCourse,
  GetPopularCourses,
  addOneVideosToCourse,
  deleteVideoFromCourse,
  getCoursesForAdmin,
} from "../controllers/CourseController.js";
import { upload } from "../middleware/multerConfig.js";

import {
  authenticateToken,
  authorizeRoles,
  getIdUser,
} from "../middleware/Auth.js";

const CourseRouter = Router();

CourseRouter.post(
  "/course/create",
  authenticateToken,
  authorizeRoles(["admin"]),
  upload.single("file"),
  CreateCourse
);
CourseRouter.get("/course/newest", GetNewestCourse);
CourseRouter.put("/course/add_videos/:id", addVideosToCourse);
CourseRouter.put(
  "/course/add_video/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  addOneVideosToCourse
);
CourseRouter.delete(
  "/course/delete_video/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteVideoFromCourse
);
CourseRouter.put(
  "/course/update/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteVideoFromCourse
);
CourseRouter.get("/course/populaire", GetPopularCourses);
CourseRouter.get("/courses/", getIdUser, GetCoursesByFilter);
CourseRouter.get("/course/:id", getIdUser, GetCourseById);
CourseRouter.get(
  "/admin/courses",
  authenticateToken,
  authorizeRoles(["admin"]),
  getCoursesForAdmin
);

export default CourseRouter;
