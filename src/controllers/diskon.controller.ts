import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function createDiskon(req: Request, res: Response) {
    const { nama_diskon, persentase_diskon, tanggal_awal, tanggal_akhir } = req.body;

    const diskon = await prisma.diskon.create({
        data: {
            nama_diskon,
            persentase_diskon,
            tanggal_awal: new Date(tanggal_awal),
            tanggal_akhir: new Date(tanggal_akhir)
        }
    });

    res.json(diskon);
}

export async function listDiskon(req: Request, res: Response) {
    const data = await prisma.diskon.findMany({
        include: { menuDiskon: { include: { menu: true } } },
        orderBy: { id: "asc" }
    });
    res.json(data);
}

export async function getDiskon(req: Request, res: Response) {
    const id = Number(req.params.id);

    const diskon = await prisma.diskon.findUnique({
        where: { id },
        include: { menuDiskon: { include: { menu: true } } }
    });

    if (!diskon) return res.status(404).json({ message: "Diskon not found" });
    res.json(diskon);
}

export async function updateDiskon(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { tanggal_awal, tanggal_akhir, ...rest } = req.body;

    const updated = await prisma.diskon.update({
        where: { id },
        data: {
            ...rest,
            ...(tanggal_awal ? { tanggal_awal: new Date(tanggal_awal) } : {}),
            ...(tanggal_akhir ? { tanggal_akhir: new Date(tanggal_akhir) } : {})
        }
    });

    res.json(updated);
}

export async function deleteDiskon(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.diskon.delete({ where: { id } });
    res.json({ message: "Diskon deleted" });
}

// attach diskon ke menu (pivot)
export async function attachDiskonToMenu(req: Request, res: Response) {
    const { id_menu, id_diskon } = req.body;

    const row = await prisma.menuDiskon.create({
        data: { id_menu, id_diskon }
    });

    res.json({ message: "Diskon attached to menu", data: row });
}

// detach diskon dari menu (pivot)
export async function detachDiskonFromMenu(req: Request, res: Response) {
    const { id_menu, id_diskon } = req.body;

    // karena pivot pakai @@unique([id_menu,id_diskon])
    const row = await prisma.menuDiskon.deleteMany({
        where: { id_menu, id_diskon }
    });

    res.json({ message: "Diskon detached from menu", data: row });
}
