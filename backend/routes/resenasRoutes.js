import { createResena, deleteResena, getResenas } from "../controllers/resenasController.js";

import express from "express";

const router = express.Router();

router.get("/", getResenas);
router.post("/", createResena); // protegido si deseas
router.delete("/:id", deleteResena);

export default router;
