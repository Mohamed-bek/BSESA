import { Router } from "express";
import {
  deleteUser,
  getCounts,
  getUsers,
  makeUserAdmin,
} from "../controllers/AdminController.js";
import { getCourseAnalyst } from "../controllers/CourseController.js";
import { getOrderAnalyst } from "../controllers/OrderController.js";
import { getUserAnalytics } from "../controllers/UserController.js";
import { authenticateToken, authorizeRoles } from "../middleware/Auth.js";
const AdminRouter = Router();

AdminRouter.delete(
  "/user/:userId",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteUser
);

AdminRouter.get(
  "/users/:page",
  authenticateToken,
  authorizeRoles(["admin"]),
  getUsers
);

AdminRouter.get(
  "/user/:userId",
  authenticateToken,
  authorizeRoles(["admin"]),
  getUsers
);

AdminRouter.put(
  "/:userId",
  authenticateToken,
  authorizeRoles(["admin"]),
  makeUserAdmin
);
AdminRouter.get(
  "/user_analytics",
  authenticateToken,
  authorizeRoles(["admin"]),
  getUserAnalytics
);

AdminRouter.get(
  "/counts",
  authenticateToken,
  authorizeRoles(["admin"]),
  getCounts
);

AdminRouter.get(
  "/order_analytics",
  authenticateToken,
  authorizeRoles(["admin"]),
  getOrderAnalyst
);

AdminRouter.get(
  "/course_analytics",
  authenticateToken,
  authorizeRoles(["admin"]),
  getCourseAnalyst
);

export default AdminRouter;
