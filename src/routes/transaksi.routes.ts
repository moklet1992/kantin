import { Router } from "express";
import { authGuard } from "../middlewares/auth.js";
import {
    createTransaksi,
    listTransaksi,
    getTransaksi,
    updateStatusTransaksi,
    deleteTransaksi
} from "../controllers/transaksi.controller.js";

const router = Router();

// transaksi biasanya perlu auth
router.use(authGuard);

router.get("/", listTransaksi);
router.get("/:id", getTransaksi);
router.post("/", createTransaksi);
router.put("/:id/status", updateStatusTransaksi);
router.delete("/:id", deleteTransaksi);

export default router;
