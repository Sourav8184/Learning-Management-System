import { Router } from "express";
import {
  contactUsWithEmail,
  userSubscriptionStatus,
} from "../controllers/miscellaneousController.js";
import { isLoggedIn, authorizeRoles } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/contact").post(contactUsWithEmail);
router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizeRoles("ADMIN"), userSubscriptionStatus);

export default router;
