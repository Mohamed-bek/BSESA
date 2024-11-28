import { Router } from "express";
import { createOrUpdateHero, getPage } from "../controllers/PageController.js";
import { authenticateToken, authorizeRoles } from "../middleware/Auth.js";
import { uploadLargeFiles } from "../middleware/multerConfig.js";

const PageRouter = Router();

PageRouter.post(
  "/pages/hero",
  authenticateToken,
  authorizeRoles(["admin"]),
  uploadLargeFiles.single("file"),
  createOrUpdateHero
);

PageRouter.get("/page", getPage);

export default PageRouter;
