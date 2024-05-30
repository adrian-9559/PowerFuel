-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.36 - MySQL Community Server - GPL
-- SO del servidor:              Win64
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


-- Volcando estructura de base de datos para database_web
CREATE DATABASE IF NOT EXISTS `database_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `database_web`;

-- Volcando estructura para tabla database_web.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id_brand` int NOT NULL,
  `brand_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.brands: ~0 rows (aproximadamente)
DELETE FROM `brands`;
INSERT INTO `brands` (`id_brand`, `brand_name`) VALUES
	(1, 'Prozis');

-- Volcando estructura para tabla database_web.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.categories: ~17 rows (aproximadamente)
DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`, `parent_category_id`) VALUES
	(1, 'Suplementación', NULL),
	(2, 'Proteina', NULL),
	(3, 'Creatina', NULL),
	(4, 'Glutamina', NULL),
	(5, 'Aminoácidos', NULL),
	(8, 'Cafeína', NULL),
	(9, 'L-Canitina', NULL),
	(10, 'Intraentreno', NULL),
	(11, 'Bebidas Isotonicas y Electrolitos', NULL),
	(12, 'Carne y Huevo', 2),
	(13, 'Vegetal', 2),
	(14, 'Dietetica', 2),
	(15, 'Barritas', 2),
	(16, 'Coláheno', 2),
	(17, 'Estimulantes y Testosterona', NULL),
	(29, 'Barras', NULL);

-- Volcando estructura para tabla database_web.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `notification_date` datetime NOT NULL,
  `viewed` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `reference` varchar(200) DEFAULT NULL,
  `notification_user` int NOT NULL,
  `type` enum('Order','Notification') NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `reference` (`reference`),
  KEY `notification_user` (`notification_user`),
  CONSTRAINT `FK_Order_Notification` FOREIGN KEY (`reference`) REFERENCES `orders` (`order_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_User_Notification` FOREIGN KEY (`notification_user`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.notification: ~2 rows (aproximadamente)
DELETE FROM `notification`;
INSERT INTO `notification` (`notification_id`, `title`, `description`, `notification_date`, `viewed`, `reference`, `notification_user`, `type`) VALUES
	(17, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMGKiIqj90TtX551fA0TDp2', '2024-05-30 21:16:33', '1', 'py_3PMGKiIqj90TtX551fA0TDp2', 74, 'Order'),
	(23, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMHlaIqj90TtX550t2HjLdS', '2024-05-30 22:48:23', '1', 'py_3PMHlaIqj90TtX550t2HjLdS', 73, 'Order'),
	(24, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMHmTIqj90TtX550nXrf7aD', '2024-05-30 22:49:17', '1', 'py_3PMHmTIqj90TtX550nXrf7aD', 73, 'Order'),
	(25, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMHqvIqj90TtX553lAkWGub', '2024-05-30 22:54:49', '1', '', 73, 'Order'),
	(26, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMI1lIqj90TtX553z6jMAMu', '2024-05-30 23:05:06', '1', 'py_3PMI1lIqj90TtX553z6jMAMu', 73, 'Order');

-- Volcando estructura para tabla database_web.old_passwords
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `user_id` int DEFAULT NULL,
  `previous_password` varchar(255) DEFAULT NULL,
  `change_date` timestamp NULL DEFAULT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.old_passwords: ~0 rows (aproximadamente)
DELETE FROM `old_passwords`;

-- Volcando estructura para tabla database_web.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` varchar(50) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.orders: ~11 rows (aproximadamente)
DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `order_status`, `details`) VALUES
	('', 73, '2024-05-30', 'pending', '[{"product_id":52,"quantity":1}]'),
	('py_3PME8nIqj90TtX553hrixEBV', 74, '2024-05-30', 'pending', '[{"product_id":52,"quantity":1}]'),
	('py_3PMEC1Iqj90TtX551kTzUqjW', 74, '2024-05-30', 'pending', '[{"product_id":52,"quantity":1}]'),
	('py_3PMEEZIqj90TtX553wiSnhlP', 74, '2024-05-30', 'pending', '[{"product_id":54,"quantity":1}]'),
	('py_3PMG1wIqj90TtX552z1sUZJd', 74, '2024-05-30', 'pending', '[{"product_id":53,"quantity":1},{"product_id":52,"quantity":1}]'),
	('py_3PMGFxIqj90TtX55169QgE5X', 74, '2024-05-30', 'pending', '[{"product_id":49,"quantity":1}]'),
	('py_3PMGHMIqj90TtX553eV8GOTn', 74, '2024-05-30', 'pending', '[{"product_id":49,"quantity":1}]'),
	('py_3PMGIjIqj90TtX551g2rsE2g', 74, '2024-05-30', 'pending', '[{"product_id":55,"quantity":1}]'),
	('py_3PMGKiIqj90TtX551fA0TDp2', 74, '2024-05-30', 'pending', '[{"product_id":49,"quantity":1}]'),
	('py_3PMHlaIqj90TtX550t2HjLdS', 73, '2024-05-30', 'pending', '[{"product_id":54,"quantity":1}]'),
	('py_3PMHmTIqj90TtX550nXrf7aD', 73, '2024-05-30', 'pending', '[{"product_id":53,"quantity":1}]'),
	('py_3PMI1lIqj90TtX553z6jMAMu', 73, '2024-05-30', 'pending', '[{"product_id":50,"quantity":1},{"product_id":51,"quantity":1},{"product_id":49,"quantity":1}]');

-- Volcando estructura para tabla database_web.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `id_brand` int DEFAULT NULL,
  `status` enum('Enabled','Disabled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Disabled',
  `category_id` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `stripe_product_id` varchar(50) DEFAULT NULL,
  `stripe_price_id` varchar(50) DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `id_brand` (`id_brand`),
  KEY `category_ibfk_1` (`category_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.products: ~7 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `phone_number`, `stripe_product_id`, `stripe_price_id`, `registration_date`) VALUES
	(49, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(50, 'a2', 'asddasd', 1.00, 1, 1, 'Disabled', 8, NULL, 'prod_QCcGzEiucZsh6w', 'price_1PMD2HIqj90TtX55jsC0Eptx', '2024-05-30 17:45:12'),
	(51, 'a3', 'dasdasd', 1.00, 1, 1, 'Disabled', 5, NULL, 'prod_QCcH3p6iQF8juU', 'price_1PMD2XIqj90TtX55p15kY76Q', '2024-05-30 17:45:28'),
	(52, 'a4', 'a45', 1.00, 1, 1, 'Disabled', 8, NULL, 'prod_QCcHw9QBN2CepA', 'price_1PMD2nIqj90TtX55nHTuJuxV', '2024-05-30 17:45:44'),
	(53, 'a6', '15623', 1.00, 1, 1, 'Disabled', 8, NULL, 'prod_QCcHTX8WIqYAA0', 'price_1PMD33Iqj90TtX55gEzIVYgn', '2024-05-30 17:46:00'),
	(54, '123', '1323', 1.00, 1, 1, 'Disabled', 8, NULL, 'prod_QCcHmSe6XlrQnX', 'price_1PMD3IIqj90TtX55lhMZKrPR', '2024-05-30 17:46:15'),
	(55, '131231', '4124124', 1.00, 1, 1, 'Disabled', 4, NULL, 'prod_QCcIZdCxTPGUIm', 'price_1PMD3UIqj90TtX55zJfsfL26', '2024-05-30 17:46:27'),
	(56, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(57, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(58, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(59, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(60, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(61, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(62, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(63, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(64, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(65, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(66, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(67, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(68, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00'),
	(69, 'asd', 'asd', 1123.00, 1, 1, 'Disabled', 9, NULL, 'prod_QCHs671adWSSat', 'price_1PLtIsIqj90TtX55Hy5PUWFR', '2024-05-29 20:41:00');

-- Volcando estructura para tabla database_web.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.roles: ~7 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(99, 'Administrador'),
	(96, 'Manager de Analiticas'),
	(94, 'Manager de Pedidos'),
	(97, 'Manager de Productos'),
	(95, 'Manager de Soporte'),
	(98, 'Manager de Usuarios'),
	(10, 'Usuario');

-- Volcando estructura para tabla database_web.user_address
CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zip` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_address: ~2 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`, `is_default`) VALUES
	(50, 73, 'Plaza de Uruguay 7, Coslada, Madrid, España', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(51, 74, 'c/ Doctor Fleming 6 3ºA', 'Coslada', 'España', '28821', 'Madrid', 602240748, 0);

-- Volcando estructura para tabla database_web.user_credentials
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `current_password` varchar(255) DEFAULT NULL,
  `stripe_customer_id` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive','Suspended') NOT NULL DEFAULT 'Active',
  `registration_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`, `stripe_customer_id`, `status`, `registration_date`) VALUES
	(73, 'adrigar250503@gmail.com', '$2b$10$ETReeNIcBLMtvWojeg.phO1zerd/0sYMrMnCgebimzisr8dbVGICu', 'cus_QCH9XSpm87qPW1', 'Active', '2024-05-29 19:56:07'),
	(74, 'adrian.escribano3@gmail.com', '$2b$10$HXHGnAqfSS0Ol0E3uL0QJO56iWDFgd1.bS5kMyXrks43JuQleMvl.', 'cus_QCI0KGiumt3oRZ', 'Active', '2024-05-29 20:49:15');

-- Volcando estructura para tabla database_web.user_info
CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_info: ~1 rows (aproximadamente)
DELETE FROM `user_info`;
INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `dni`) VALUES
	(73, 'Adrián', 'García Torrente', '49815997K'),
	(74, 'Adrián', 'Escribano', '49814242z');

-- Volcando estructura para tabla database_web.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id_ibfk_1` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_roles: ~2 rows (aproximadamente)
DELETE FROM `user_roles`;
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	(73, 99),
	(74, 99);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
