import { Router } from "express";
import {
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getRazorpayApiKey,
  allPayments,
} from "../controllers/paymentController.js";
import {
  isLoggedIn,
  authorizeRoles,
  authorizeSubscribers,
} from "../middleware/authMiddleware.js";

const router = Router();

router.route("/subscribe").post(isLoggedIn, buySubscription);

router.route("/verify").post(isLoggedIn, verifySubscription);

router
  .route("/unsubscribe")
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);

router.route("/").get(isLoggedIn, authorizeRoles("ADMIN"), allPayments);

export default router;
