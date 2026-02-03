import { Router } from "express";
import { authGuard, roleGuard } from "../middlewares/auth.js";
import { createMenu, listMenu, getMenu, updateMenu, deleteMenu } from "../controllers/menu.controller.js";

const router = Router();

// menu dibaca siswa, tapi create/update/delete oleh admin_stan
router.get("/", listMenu);
router.get("/:id", getMenu);

router.use(authGuard);
router.use(roleGuard(["admin_stan"]));
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
