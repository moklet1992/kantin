import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export async function register(req: Request, res: Response) {
    const { username, password, role } = req.body;

    const exists = await prisma.users.findUnique({ where: { username } });
    if (exists) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
        data: { username, password: hashed, role },
        select: { id: true, username: true, role: true }
    });

    res.json({ message: "Register success", user });
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        secret,
        { expiresIn: "2h" }
    );

    res.json({ message: "Login success", token });
}
