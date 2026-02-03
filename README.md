Pastikan Node versi 18
node -v
Harus 18.x

Kalau pakai nvm:
nvm install 18
nvm use 18

Install dependency
npm install

Buat .env
Copy dari template
Lalu edit .env:

DATABASE_URL="mysql://root:password@localhost:3306/canteen_db"
JWT_SECRET="any-random-secret"
PORT=3000

Generate prisma client + migrate database
npx prisma generate
npx prisma migrate dev
migrate dev akan membuat tabel sesuai schema dan menjalankan migration.

Jalankan server
npm run dev
