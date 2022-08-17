-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Agu 2022 pada 21.08
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loginexam`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Nugrahanto', 'nugra@gmail.com', '$2b$10$vP9QmeytfP4ssDDrI1NTje.WYRJWlYBepf0bXVH8ogm4wZjNyoWQ6', NULL, '2022-08-16 05:23:51', '2022-08-16 18:36:41'),
(2, 'ibrahim', 'ibra@gmail.com', '$2b$10$QWcxDnx0gpnFyARW1IMKu.7Uep.yGH35a5lkNip/PFVqQqPGwmRoC', NULL, '2022-08-16 06:31:08', '2022-08-16 06:31:32'),
(3, 'helena', 'lena@gmail.com', '$2b$10$ebzVril7Rf3BoXgR3j40R.5LSn8blSPjnDgSV5na2MyMWQJ6LEcVq', NULL, '2022-08-16 06:39:09', '2022-08-16 06:39:37'),
(4, 'safira', 'fira@gmail.com', '$2b$10$fHDtQ1C0whwZ.ufahjF63OmsECZNjM6Ln7ESuziM6Qo2/nengiIMm', NULL, '2022-08-16 08:25:03', '2022-08-16 08:26:10'),
(5, 'Rianirsyah', 'rian@gmail.com', '$2b$10$34fbLbgRqH12h7wSQHX5r.dINnMrGRSX/BXsJ8dxwK3v7WgFtuRM2', NULL, '2022-08-16 18:59:46', '2022-08-16 19:03:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
