import { getAbout, updateAbout } from "../controllers/aboutController.js";

import express from "express";

const router = express.Router();

router.get("/", getAbout);
router.post("/", updateAbout); // protegido si quieres, con middleware de auth

export default router;
