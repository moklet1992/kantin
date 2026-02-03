import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import siswaRoutes from "./routes/siswa.routes.js";
import stanRoutes from "./routes/stan.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import diskonRoutes from "./routes/diskon.routes.js";
import transaksiRoutes from "./routes/transaksi.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // supaya bisa membaca req.body JSON

app.get("/", (req, res) => res.json({ message: "Canteen API is running" }));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/siswa", siswaRoutes);
app.use("/stan", stanRoutes);
app.use("/menu", menuRoutes);
app.use("/diskon", diskonRoutes);
app.use("/transaksi", transaksiRoutes);

// error handler sederhana
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
