import { Router } from "express";
import {
  CreateVideo,
  GetAllVideos,
  GetVideo,
} from "../controllers/VideoController.js";
import { upload, uploadLargeFile } from "../middleware/multerConfig.js";
import { checkVideoAccess } from "../middleware/CoursesProtection.js";
import { authenticateToken, authorizeRoles } from "../middleware/Auth.js";

const VideoRouter = Router();

VideoRouter.post(
  "/video/create",
  authenticateToken,
  authorizeRoles(["admin"]),
  upload.single("file"),
  CreateVideo
);
VideoRouter.get(
  "/videos",
  authenticateToken,
  authorizeRoles(["admin"]),
  GetAllVideos
);
VideoRouter.get("/video/:courseId/:videoId", checkVideoAccess, GetVideo);

export default VideoRouter;
