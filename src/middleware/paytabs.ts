import { NextFunction, Response, Request } from "express";
import crypto from "crypto";

const verifySignature = (req: Request, res: Response, next: NextFunction) => {
  const { signature: requestSignature } = req.headers;
  const payload = req.body;

  if (!payload || !requestSignature) {
    res.status(401).json({ message: `Invalid signature` });
    return;
  } else {
    const Signature = crypto
      .createHmac("sha256", process.env.PAYTABS_API_KEY!)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (requestSignature === Signature) next();
    else res.status(401).json({ message: `Invalid signature` });
  }
};

export { verifySignature };
