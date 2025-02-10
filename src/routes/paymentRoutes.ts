import { Router } from "express";
import { handleCallback, initPayment } from "../controller/paymentController";
import { verifySignature } from "../middleware/paytabs";

const router = Router();

router.post("/init", initPayment);
router.post("/callback", verifySignature, handleCallback);

export default router;
