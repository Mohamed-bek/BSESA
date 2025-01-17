import { Router } from "express";
import {
  CreateVideo,
  deleteVideoAndRemoveFromCourses,
  GetAllVideos,
  GetUrlForVideo,
  GetVideo,
  GetVideoForAdmin,
  UpdateVideo,
} from "../controllers/VideoController.js";
import { upload } from "../middleware/multerConfig.js";
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

VideoRouter.post(
  "/video/url",
  authenticateToken,
  authorizeRoles(["admin"]),
  GetUrlForVideo
);

VideoRouter.get(
  "/videos",
  authenticateToken,
  authorizeRoles(["admin"]),
  GetAllVideos
);
VideoRouter.get(
  "/admin/video/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  GetVideoForAdmin
);
VideoRouter.put(
  "/admin/video/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  upload.single("file"),
  UpdateVideo
);

VideoRouter.delete(
  "/admin/video/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteVideoAndRemoveFromCourses
);
VideoRouter.get("/video/:courseId/:videoId", checkVideoAccess, GetVideo);

export default VideoRouter;
