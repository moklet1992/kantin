import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";

export async function listUsers(req: Request, res: Response) {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            username: true,
            role: true,
            siswa: { select: { id: true, nama_siswa: true } },
            stan: { select: { id: true, nama_stan: true } }
        },
        orderBy: { id: "asc" }
    });
    res.json(users);
}

export async function getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await prisma.users.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            role: true,
            siswa: true,
            stan: true
        }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
}

export async function updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { username, password, role } = req.body;

    const data: any = {};
    if (username) data.username = username;
    if (role) data.role = role;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updated = await prisma.users.update({
        where: { id },
        data,
        select: { id: true, username: true, role: true }
    });

    res.json(updated);
}

export async function deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.users.delete({ where: { id } });
    res.json({ message: "User deleted" });
}
