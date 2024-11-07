
import { Router } from "express";
const router = Router();
import * as orderController from "../controllers/order.controller";

router.post("/placeOrder", orderController.placeOrder);
router.get("/getOrder", orderController.getOrder);

module.exports = router;
