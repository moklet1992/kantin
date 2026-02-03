import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function createSiswa(req: Request, res: Response) {
    const { nama_siswa, alamat, telp, foto, id_user } = req.body;

    const siswa = await prisma.siswa.create({
        data: { nama_siswa, alamat, telp, foto, id_user }
    });

    res.json(siswa);
}

export async function updateSiswa(req: Request, res: Response) {
    const id = Number(req.params.id);
    const siswa = await prisma.siswa.update({
        where: { id },
        data: req.body
    });
    res.json(siswa);
}

export async function deleteSiswa(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.siswa.delete({ where: { id } });
    res.json({ message: "Deleted" });
}

export async function listSiswa(req: Request, res: Response) {
    const data = await prisma.siswa.findMany({ include: { user: true } });
    res.json(data);
}

export async function getSiswa(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await prisma.siswa.findUnique({ where: { id }, include: { user: true } });
    res.json(data);
}
