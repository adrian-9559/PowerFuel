-- --------------------------------------------------------
-- Host:                         192.168.1.142
-- Versión del servidor:         8.0.36-0ubuntu0.22.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para database_WEB
CREATE DATABASE IF NOT EXISTS `database_WEB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `database_WEB`;

-- Volcando estructura para tabla database_WEB.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id_brand` int NOT NULL,
  `brand_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.brands: ~1 rows (aproximadamente)
DELETE FROM `brands`;
INSERT INTO `brands` (`id_brand`, `brand_name`) VALUES
	(1, 'Prozis');

-- Volcando estructura para tabla database_WEB.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.categories: ~19 rows (aproximadamente)
DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`, `parent_category_id`) VALUES
	(1, 'Suplementación', NULL),
	(2, 'Proteina', 6),
	(3, 'Creatina', 6),
	(4, 'Glutamina', 6),
	(5, 'Aminoácidos', 6),
	(6, 'Desarrollo Muscular', 1),
	(7, 'Energía y Resistencia', 1),
	(8, 'Cafeína', 7),
	(9, 'L-Canitina', 7),
	(10, 'Intraentreno', 7),
	(11, 'Bebidas Isotonicas y Electrolitos', 7),
	(12, 'Carne y Huevo', 2),
	(13, 'Vegetal', 2),
	(14, 'Dietetica', 2),
	(15, 'Barritas', 2),
	(16, 'Coláheno', 2),
	(17, 'Estimulantes y Testosterona', 6),
	(18, 'Aminoácidos Esenciales', 6),
	(29, 'Barras', NULL);

-- Volcando estructura para tabla database_WEB.old_passwords
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `user_id` int DEFAULT NULL,
  `previous_password` varchar(255) DEFAULT NULL,
  `change_date` timestamp NULL DEFAULT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.old_passwords: ~0 rows (aproximadamente)
DELETE FROM `old_passwords`;

-- Volcando estructura para tabla database_WEB.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `order_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.orders: ~0 rows (aproximadamente)
DELETE FROM `orders`;

-- Volcando estructura para tabla database_WEB.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.order_details: ~0 rows (aproximadamente)
DELETE FROM `order_details`;

-- Volcando estructura para tabla database_WEB.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `id_brand` int DEFAULT NULL,
  `status` enum('enable','disable') NOT NULL DEFAULT 'disable',
  `category_id` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `id_brand` (`id_brand`),
  KEY `category_ibfk_1` (`category_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.products: ~3 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `phone_number`) VALUES
	(30, 'Tortilla proteica de clara de huevo 400 g', '¡Ser o no ser, esa es la cuestión! Shakespeare inmortalizó esta cita en Hamlet, pero la cuestión se vuelve fácil (y la respuesta también) con nuestro omelet. ¡De hecho, queremos simplificar y hacer frente a las grandes cuestiones de la vida!\r\n\r\n¡Basta de tragedias! ¡Se acabó el drama por la falta de tiempo o de ingredientes! Se acabó el estrés por no poder seguir el estilo de vida saludable que quieres. Aquí tienes la solución. Solo tienes que seguir las instrucciones del paquete. ¡Si Hamlet lo hubiera sabido!', 24.99, 0, 1, 'enable', 1, NULL),
	(31, 'aaaa', 'aaaaa', 6.99, 123, 1, 'enable', 11, NULL),
	(32, 'wadcasd', 'awdadw', 1.00, 11234, 1, 'enable', 29, NULL);

-- Volcando estructura para tabla database_WEB.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.roles: ~7 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(99, 'admin'),
	(96, 'managerAnalytics'),
	(94, 'managerOrder'),
	(97, 'managerProduct'),
	(95, 'managerSupport'),
	(98, 'managerUser'),
	(10, 'user');

-- Volcando estructura para tabla database_WEB.user_address
CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zip` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.user_address: ~1 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`) VALUES
	(29, 25, 'c/ Doctor Fleming', 'Coslada', 'España', '28821', 'Madrid', 602240748);

-- Volcando estructura para tabla database_WEB.user_credentials
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `current_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`) VALUES
	(25, 'adrian.escribano3@gmail.com', '$2b$10$D7t6MTFT1AYiSZM41c6lNuy0neKh10AweQAKNwT2ifomsY56UAmZS'),
	(68, 'adrigar250503@gmail.com', '$2b$10$CDuvsqVWHkejFEFOLy/Lmuivgwp6jDKYovTTyGeJnEnI/ZRKmmIci');

-- Volcando estructura para tabla database_WEB.user_info
CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.user_info: ~2 rows (aproximadamente)
DELETE FROM `user_info`;
INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `dni`) VALUES
	(25, 'Adrián', 'Escribano', '49814242z'),
	(68, 'Adrián', 'García Torrente', '49815997k');

-- Volcando estructura para tabla database_WEB.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id_ibfk_1` (`role_id`),
  CONSTRAINT `role_id_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_WEB.user_roles: ~2 rows (aproximadamente)
DELETE FROM `user_roles`;
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	(25, 99),
	(68, 99);

-- Volcando estructura para disparador database_WEB.after_delete_role
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_delete_role` AFTER DELETE ON `roles` FOR EACH ROW BEGIN
    UPDATE user_roles
    SET role_id = 0
    WHERE role_id = OLD.role_id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
