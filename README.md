Langkah orang lain ketika clone project (agar pasti jalan)
1) Clone repo
git clone <repo_url>
cd canteen-backend

2) Pastikan Node versi 18

Cek:

node -v


Harus 18.x

Kalau pakai nvm:

nvm install 18
nvm use 18

3) Install dependency
npm install

4) Buat .env

Copy dari template:

cp .env.example .env


Lalu edit .env:

DATABASE_URL="mysql://root:password@localhost:3306/canteen_db"
JWT_SECRET="any-random-secret"
PORT=3000

5) Buat database di MySQL

Masuk MySQL lalu:

CREATE DATABASE canteen_db;

6) Generate prisma client + migrate database

Jalankan:

npx prisma generate
npx prisma migrate dev


migrate dev akan membuat tabel sesuai schema dan menjalankan migration.

7) Jalankan server
npm run dev
