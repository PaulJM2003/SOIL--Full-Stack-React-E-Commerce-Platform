
import { Router } from "express";
const router = Router();
import * as cartController from "../controllers/cart.controller";

router.get("/getCart", cartController.fetchCart);
router.post("/addItem", cartController.addItem);
router.post("/removeItem", cartController.removeItem);
router.post("/updateItem", cartController.updateItemQuantity);
router.post("/destroyCart", cartController.destroyCart);

module.exports = router;
