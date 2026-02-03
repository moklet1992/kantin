import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function createStan(req: Request, res: Response) {
    const { nama_stan, nama_pemilik, telp, id_user } = req.body;

    const stan = await prisma.stan.create({
        data: { nama_stan, nama_pemilik, telp, id_user }
    });

    res.json(stan);
}

export async function listStan(req: Request, res: Response) {
    const data = await prisma.stan.findMany({
        include: { user: { select: { id: true, username: true, role: true } } },
        orderBy: { id: "asc" }
    });
    res.json(data);
}

export async function getStan(req: Request, res: Response) {
    const id = Number(req.params.id);
    const stan = await prisma.stan.findUnique({
        where: { id },
        include: { user: { select: { id: true, username: true, role: true } } }
    });
    if (!stan) return res.status(404).json({ message: "Stan not found" });
    res.json(stan);
}

export async function updateStan(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await prisma.stan.update({
        where: { id },
        data: req.body
    });
    res.json(updated);
}

export async function deleteStan(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.stan.delete({ where: { id } });
    res.json({ message: "Stan deleted" });
}
