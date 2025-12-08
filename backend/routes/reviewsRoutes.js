import {
  createReview,
  deleteReview,
  getReviews,
  updateReview
} from "../controllers/reviewsController.js";

import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📌 Public routes
router.get("/", getReviews);
// router.get("/:id", getReviewById); // (optional if you want a "get by ID")

// 📌 Protected routes (admin only)
router.post("/", verifyToken, upload.single("client_photo"), createReview);

router.put("/:id", verifyToken, upload.single("client_photo"), updateReview);

router.delete("/:id", verifyToken, deleteReview);

export default router;
