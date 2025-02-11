import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/payment", paymentRoutes);

app.listen(5550, () => {
  console.log(`Server is running on port 5550`);
});
