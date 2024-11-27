import { Router } from "express";
import {
  authenticateToken,
  authorizeRoles,
  getIdUser,
} from "../middleware/Auth.js";
import {
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
  createMembership,
} from "../controllers/MemeberShipController.js";
const MemeberShipRouter = Router();

MemeberShipRouter.post(
  "/memberships",
  authenticateToken,
  authorizeRoles(["admin"]),
  createMembership
);
MemeberShipRouter.get("/memberships", getIdUser, getAllMemberships);
MemeberShipRouter.get("/membership/:id", getMembershipById);
MemeberShipRouter.put(
  "/memberships/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  updateMembership
);
MemeberShipRouter.delete(
  "/memberships/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteMembership
);

export default MemeberShipRouter;
