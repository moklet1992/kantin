import { Router } from "express";
import { authGuard, roleGuard } from "../middlewares/auth.js";
import {
    createDiskon, listDiskon, getDiskon, updateDiskon, deleteDiskon,
    attachDiskonToMenu, detachDiskonFromMenu
} from "../controllers/diskon.controller.js";

const router = Router();

// siswa boleh lihat diskon
router.get("/", listDiskon);
router.get("/:id", getDiskon);

// admin_stan yang boleh kelola diskon dan attach/detach
router.use(authGuard);
router.use(roleGuard(["admin_stan"]));

router.post("/", createDiskon);
router.put("/:id", updateDiskon);
router.delete("/:id", deleteDiskon);

router.post("/attach", attachDiskonToMenu);
router.post("/detach", detachDiskonFromMenu);

export default router;
