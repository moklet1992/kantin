-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('admin_stan', 'siswa') NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_siswa` VARCHAR(100) NOT NULL,
    `alamat` TEXT NOT NULL,
    `telp` VARCHAR(20) NOT NULL,
    `foto` VARCHAR(255) NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Siswa_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_stan` VARCHAR(100) NOT NULL,
    `nama_pemilik` VARCHAR(100) NOT NULL,
    `telp` VARCHAR(20) NOT NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Stan_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_makanan` VARCHAR(100) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `jenis` ENUM('makanan', 'minuman') NOT NULL,
    `foto` VARCHAR(255) NULL,
    `deskripsi` TEXT NOT NULL,
    `id_stan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_stan` INTEGER NOT NULL,
    `id_siswa` INTEGER NOT NULL,
    `status` ENUM('belum_dikonfirm', 'dimasak', 'diantar', 'sampai') NOT NULL DEFAULT 'belum_dikonfirm',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTransaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `harga_beli` DOUBLE NOT NULL,
    `id_transaksi` INTEGER NOT NULL,
    `id_menu` INTEGER NOT NULL,

    INDEX `DetailTransaksi_id_transaksi_idx`(`id_transaksi`),
    INDEX `DetailTransaksi_id_menu_idx`(`id_menu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_diskon` VARCHAR(100) NOT NULL,
    `persentase_diskon` DOUBLE NOT NULL,
    `tanggal_awal` DATETIME(3) NOT NULL,
    `tanggal_akhir` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuDiskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_menu` INTEGER NOT NULL,
    `id_diskon` INTEGER NOT NULL,

    UNIQUE INDEX `MenuDiskon_id_menu_id_diskon_key`(`id_menu`, `id_diskon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stan` ADD CONSTRAINT `Stan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_id_stan_fkey` FOREIGN KEY (`id_stan`) REFERENCES `Stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_stan_fkey` FOREIGN KEY (`id_stan`) REFERENCES `Stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDiskon` ADD CONSTRAINT `MenuDiskon_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDiskon` ADD CONSTRAINT `MenuDiskon_id_diskon_fkey` FOREIGN KEY (`id_diskon`) REFERENCES `Diskon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
