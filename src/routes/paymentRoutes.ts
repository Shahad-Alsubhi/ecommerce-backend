import { Router } from "express";
import {
  handleCallback,
  handleResponse,
  initPayment,
} from "../controller/paymentController";
import { verifySignature } from "../middleware/paytabs";

const router = Router();

router.post("/init", initPayment);
router.post("/callback", verifySignature, handleCallback);
router.post("/response", handleResponse);
export default router;
