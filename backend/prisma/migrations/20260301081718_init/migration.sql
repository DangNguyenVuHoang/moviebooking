-- CreateTable
CREATE TABLE `Phim` (
    `ma_phim` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_phim` VARCHAR(255) NOT NULL,
    `trailer` VARCHAR(500) NULL,
    `hinh_anh` VARCHAR(500) NULL,
    `mo_ta` VARCHAR(2000) NULL,
    `ngay_khoi_chieu` DATE NULL,
    `danh_gia` INTEGER NULL DEFAULT 0,
    `hot` BOOLEAN NOT NULL DEFAULT false,
    `dang_chieu` BOOLEAN NOT NULL DEFAULT false,
    `sap_chieu` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`ma_phim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `ma_banner` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phim` INTEGER NOT NULL,
    `hinh_anh` VARCHAR(500) NOT NULL,

    INDEX `Banner_ma_phim_idx`(`ma_phim`),
    PRIMARY KEY (`ma_banner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeThongRap` (
    `ma_he_thong_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_he_thong_rap` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(500) NULL,

    PRIMARY KEY (`ma_he_thong_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CumRap` (
    `ma_cum_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_cum_rap` VARCHAR(255) NOT NULL,
    `dia_chi` VARCHAR(500) NOT NULL,
    `ma_he_thong_rap` INTEGER NOT NULL,

    INDEX `CumRap_ma_he_thong_rap_idx`(`ma_he_thong_rap`),
    PRIMARY KEY (`ma_cum_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RapPhim` (
    `ma_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_rap` VARCHAR(255) NOT NULL,
    `ma_cum_rap` INTEGER NOT NULL,

    INDEX `RapPhim_ma_cum_rap_idx`(`ma_cum_rap`),
    PRIMARY KEY (`ma_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ghe` (
    `ma_ghe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_ghe` VARCHAR(50) NOT NULL,
    `loai_ghe` VARCHAR(50) NOT NULL,
    `ma_rap` INTEGER NOT NULL,

    INDEX `Ghe_ma_rap_idx`(`ma_rap`),
    UNIQUE INDEX `Ghe_ma_rap_ten_ghe_key`(`ma_rap`, `ten_ghe`),
    PRIMARY KEY (`ma_ghe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichChieu` (
    `ma_lich_chieu` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_rap` INTEGER NOT NULL,
    `ma_phim` INTEGER NOT NULL,
    `ngay_gio_chieu` DATETIME(3) NOT NULL,
    `gia_ve` INTEGER NOT NULL DEFAULT 0,

    INDEX `LichChieu_ma_rap_idx`(`ma_rap`),
    INDEX `LichChieu_ma_phim_idx`(`ma_phim`),
    INDEX `LichChieu_ngay_gio_chieu_idx`(`ngay_gio_chieu`),
    PRIMARY KEY (`ma_lich_chieu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NguoiDung` (
    `tai_khoan` INTEGER NOT NULL AUTO_INCREMENT,
    `ho_ten` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `so_dt` VARCHAR(50) NULL,
    `mat_khau` VARCHAR(255) NOT NULL,
    `loai_nguoi_dung` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `NguoiDung_email_key`(`email`),
    PRIMARY KEY (`tai_khoan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatVe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tai_khoan` INTEGER NOT NULL,
    `ma_lich_chieu` INTEGER NOT NULL,
    `ma_ghe` INTEGER NOT NULL,

    INDEX `DatVe_tai_khoan_idx`(`tai_khoan`),
    INDEX `DatVe_ma_lich_chieu_idx`(`ma_lich_chieu`),
    INDEX `DatVe_ma_ghe_idx`(`ma_ghe`),
    UNIQUE INDEX `DatVe_ma_lich_chieu_ma_ghe_key`(`ma_lich_chieu`, `ma_ghe`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Banner` ADD CONSTRAINT `Banner_ma_phim_fkey` FOREIGN KEY (`ma_phim`) REFERENCES `Phim`(`ma_phim`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CumRap` ADD CONSTRAINT `CumRap_ma_he_thong_rap_fkey` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap`(`ma_he_thong_rap`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RapPhim` ADD CONSTRAINT `RapPhim_ma_cum_rap_fkey` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap`(`ma_cum_rap`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ghe` ADD CONSTRAINT `Ghe_ma_rap_fkey` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim`(`ma_rap`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LichChieu` ADD CONSTRAINT `LichChieu_ma_rap_fkey` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim`(`ma_rap`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LichChieu` ADD CONSTRAINT `LichChieu_ma_phim_fkey` FOREIGN KEY (`ma_phim`) REFERENCES `Phim`(`ma_phim`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_tai_khoan_fkey` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung`(`tai_khoan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_ma_lich_chieu_fkey` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu`(`ma_lich_chieu`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_ma_ghe_fkey` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe`(`ma_ghe`) ON DELETE CASCADE ON UPDATE CASCADE;
