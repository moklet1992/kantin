import { Router } from "express";
import { authGuard, roleGuard } from "../middlewares/auth.js";
import { createStan, listStan, getStan, updateStan, deleteStan } from "../controllers/stan.controller.js";

const router = Router();

router.use(authGuard);
// stan biasanya dikelola role admin_stan
router.use(roleGuard(["admin_stan"]));

router.get("/", listStan);
router.get("/:id", getStan);
router.post("/", createStan);
router.put("/:id", updateStan);
router.delete("/:id", deleteStan);

export default router;
