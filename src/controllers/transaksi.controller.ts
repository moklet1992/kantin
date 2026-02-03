import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// POST /transaksi
// body:
// {
//   "id_stan": 1,
//   "id_siswa": 2,
//   "status": "belum_dikonfirm",
//   "items": [
//     { "id_menu": 10, "qty": 2, "harga_beli": 12000 },
//     { "id_menu": 12, "qty": 1, "harga_beli": 8000 }
//   ]
// }
export async function createTransaksi(req: Request, res: Response) {
    const { id_stan, id_siswa, status, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "items wajib berupa array dan tidak boleh kosong" });
    }

    const transaksi = await prisma.transaksi.create({
        data: {
            id_stan,
            id_siswa,
            status,
            detail: {
                create: items.map((it: any) => ({
                    id_menu: it.id_menu,
                    qty: it.qty,
                    harga_beli: it.harga_beli
                }))
            }
        },
        include: {
            stan: true,
            siswa: true,
            detail: { include: { menu: true } }
        }
    });

    res.json(transaksi);
}

export async function listTransaksi(req: Request, res: Response) {
    const data = await prisma.transaksi.findMany({
        include: {
            stan: true,
            siswa: true,
            detail: { include: { menu: true } }
        },
        orderBy: { tanggal: "desc" }
    });
    res.json(data);
}

export async function getTransaksi(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await prisma.transaksi.findUnique({
        where: { id },
        include: {
            stan: true,
            siswa: true,
            detail: { include: { menu: true } }
        }
    });

    if (!data) return res.status(404).json({ message: "Transaksi not found" });
    res.json(data);
}

// update status saja agar sesuai alur operasional
export async function updateStatusTransaksi(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await prisma.transaksi.update({
        where: { id },
        data: { status }
    });

    res.json(updated);
}

// delete transaksi (akan cascade ke detail)
export async function deleteTransaksi(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.transaksi.delete({ where: { id } });
    res.json({ message: "Transaksi deleted" });
}
