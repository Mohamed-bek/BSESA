import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  getClubs,
  getCoachces,
  updateApplication,
} from "../controllers/ApplicationController.js";
import { authenticateToken, authorizeRoles } from "../middleware/Auth.js";
import { upload } from "../middleware/multerConfig.js";
const ApplicationRouter = Router();

// ApplicationRouter.post(
//   "/application",
//   authenticateToken,
//   authorizeRoles(["admin"]),
//   upload.single("file"),
//   createApplication
// );
ApplicationRouter.post(
  "/application",
  authenticateToken,
  authorizeRoles(["admin"]),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "steps[0][image]", maxCount: 1 },
    { name: "steps[1][image]", maxCount: 1 },
    { name: "steps[2][image]", maxCount: 1 },
    { name: "steps[3][image]", maxCount: 1 },
    { name: "steps[4][image]", maxCount: 1 },
  ]),
  createApplication
);

ApplicationRouter.get("/applications", getApplications);

ApplicationRouter.get("/application/:id", getApplicationById);

ApplicationRouter.get(
  "/coaches/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  getCoachces
);

ApplicationRouter.get(
  "/clubs/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  getClubs
);

ApplicationRouter.put(
  "/application/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  updateApplication
);
ApplicationRouter.delete(
  "/application/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteApplication
);

export default ApplicationRouter;
