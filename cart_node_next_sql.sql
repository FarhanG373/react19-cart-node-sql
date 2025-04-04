-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 04, 2025 at 07:03 AM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cart_node_next_sql`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pName` varchar(500) NOT NULL,
  `pDescription` varchar(500) NOT NULL,
  `pAddDate` varchar(50) NOT NULL,
  `pOwner` varchar(500) NOT NULL,
  `pStock` varchar(500) NOT NULL,
  `pPrice` varchar(500) NOT NULL,
  `pCategory` varchar(500) NOT NULL,
  `pImage` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `pName`, `pDescription`, `pAddDate`, `pOwner`, `pStock`, `pPrice`, `pCategory`, `pImage`) VALUES
(37, 'Motorola G85 5G (Cobalt Blue, 128 GB)  (8 GB RAM)', 'Discover the Moto G85 5G, which has a revolutionary 3D Curved pOLED 120 Hz Display protected by Gorilla Glass 5 for remarkable longevity. With the 50 MP OIS Sony LYTIA 600 Camera system, you can take beautiful pictures in any kind of illumination. Utilise Smart Connect to share content with ease and make use of the built-in 12 GB RAM and 256 GB storage. Immersive sound is produced by its Dolby Atmos Dual Stereo Speakers, and its Snapdragon 6s Gen 3 engine guarantees lightning-fast 5G speeds over', '2025-04-03 19:33:50', 'MohammadFarhan Girach', '20', '17999', 'Mobile', 'image-1743689030092.-original-imah2fjcarucmpzn.webp'),
(38, 'SONY Bravia 2 138.8 cm (55 inch) Ultra HD (4K) LED Smart Google TV with Feature for PlayStation 5  (K-55S25B)', 'Discover the Sony Bravia 2 TV for stunning visuals and thrilling immersion. Advanced upscaling technology elevates images to near-4K resolution, revealing vibrant colors, sharp contrasts, and fine details. Enjoy unmatched realism with fluid, smooth visuals, and reduced motion blur, perfect for gaming, streaming, or movies. Refined image quality delivers captivating brilliance and clarity, while exceptional audio enhances your entertainment experience, perfectly complementing breathtaking visuals', '2025-04-03 20:06:33', 'MohammadFarhan Girach', '12', '59990', 'Tele Vision', 'image-1743690993414.-original-imah2myzmrrc9kx5.webp');

-- --------------------------------------------------------

--
-- Table structure for table `userdetail`
--

DROP TABLE IF EXISTS `userdetail`;
CREATE TABLE IF NOT EXISTS `userdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phoneNumber` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userdetail`
--

INSERT INTO `userdetail` (`id`, `userName`, `name`, `email`, `password`, `phoneNumber`) VALUES
(54, '1', 'MohammadFarhan Girach', 'email@gmail.com', '$2b$10$evsT3C2x6PMJM9gVT/9uouE6OuohAbURNGpfmuBIxucQ6PF076xs2', '09998492373');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
