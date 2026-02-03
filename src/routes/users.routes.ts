import { Router } from "express";
import { authGuard, roleGuard } from "../middlewares/auth.js";
import { listUsers, getUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

// hanya admin_stan (atau nanti bisa tambah role admin sistem) yang boleh kelola user
router.use(authGuard);
router.use(roleGuard(["admin_stan"]));

router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
