import { Router } from "express";
import { authGuard } from "../middlewares/auth.js";
import { createSiswa, updateSiswa, deleteSiswa, listSiswa, getSiswa } from "../controllers/siswa.controller.js";

const router = Router();

router.use(authGuard);
router.get("/", listSiswa);
router.get("/:id", getSiswa);
router.post("/", createSiswa);
router.put("/:id", updateSiswa);
router.delete("/:id", deleteSiswa);

export default router;
