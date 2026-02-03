import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function createMenu(req: Request, res: Response) {
    const { nama_makanan, harga, jenis, foto, deskripsi, id_stan } = req.body;

    const menu = await prisma.menu.create({
        data: { nama_makanan, harga, jenis, foto, deskripsi, id_stan }
    });

    res.json(menu);
}

export async function listMenu(req: Request, res: Response) {
    const stanId = req.query.stanId ? Number(req.query.stanId) : undefined;

    const menu = await prisma.menu.findMany({
        where: stanId ? { id_stan: stanId } : undefined,
        include: { stan: true, menuDiskon: { include: { diskon: true } } },
        orderBy: { id: "asc" }
    });

    res.json(menu);
}

export async function getMenu(req: Request, res: Response) {
    const id = Number(req.params.id);

    const menu = await prisma.menu.findUnique({
        where: { id },
        include: { stan: true, menuDiskon: { include: { diskon: true } } }
    });

    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
}

export async function updateMenu(req: Request, res: Response) {
    const id = Number(req.params.id);

    const updated = await prisma.menu.update({
        where: { id },
        data: req.body
    });

    res.json(updated);
}

export async function deleteMenu(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.menu.delete({ where: { id } });
    res.json({ message: "Menu deleted" });
}
