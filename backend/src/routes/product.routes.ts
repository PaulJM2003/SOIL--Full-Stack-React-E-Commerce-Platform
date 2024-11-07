
import { Router } from "express";
const router = Router();
import * as productController from "../controllers/product.controller";

router.get("/", productController.fetchAllProducts);
router.get("/:id", productController.fetchProduct);
router.get("/fullProduct/:id", productController.fetchEnrichedProduct);

// router.post("/", reviewController.createReview);
// router.get("/:product_id", reviewController.getReviews);
// router.put("/:review_id", reviewController.updateReview);
// router.delete("/:review_id", reviewController.deleteReview);

module.exports = router;
