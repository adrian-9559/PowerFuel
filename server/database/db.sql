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
  `id_brand` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.brands: ~1 rows (aproximadamente)
DELETE FROM `brands`;
INSERT INTO `brands` (`id_brand`, `brand_name`) VALUES
	(1, 'Prozis');

-- Volcando estructura para tabla database_web.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.categories: ~27 rows (aproximadamente)
DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`, `parent_category_id`) VALUES
	(75, 'Alimentación Saludable', NULL),
	(76, 'Barritas y Snacks', 75),
	(77, 'Barritas', 76),
	(78, 'Galletas y Cereales', 76),
	(79, 'Muffins', 76),
	(80, 'Gofres y Tartas', 76),
	(81, 'Snacks Salados', 76),
	(82, 'Snacks Crudos', 76),
	(83, 'Frutos Secos y Fruta', 76),
	(84, 'Bebidas', 75),
	(85, 'Bebidas Proteicas', 84),
	(86, 'Bebidas Deportivas', 84),
	(87, 'Bebdas Vegetales', 84),
	(88, 'Cafe y Té', 84),
	(89, 'Aromas y Edulcorantes', 84),
	(90, 'Cremas', 75),
	(91, 'Cremas de Cacahuete', 90),
	(92, 'Cremas de Frutos Secos', 90),
	(93, 'Cremas para Untar', 90),
	(94, 'Cremas Proteicas', 90),
	(95, 'Congelados', 75),
	(96, 'Platos', 95),
	(97, 'Helados y Postres', 95),
	(98, 'Salsas, Siropes y Mermeladas', 75),
	(99, 'Salsa Zero', 98),
	(100, 'Siropes y Mermeladas', 98),
	(101, 'Suplementación', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.notification: ~3 rows (aproximadamente)
DELETE FROM `notification`;
INSERT INTO `notification` (`notification_id`, `title`, `description`, `notification_date`, `viewed`, `reference`, `notification_user`, `type`) VALUES
	(34, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PORIHIqj90TtX550roCD3f6', '2024-06-05 23:23:04', '1', 'py_3PORIHIqj90TtX550roCD3f6', 76, 'Order'),
	(35, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PORIcIqj90TtX553MdxwoAD', '2024-06-05 23:23:25', '1', 'py_3PORIcIqj90TtX553MdxwoAD', 74, 'Order'),
	(36, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PORMlIqj90TtX550HSWZrYM', '2024-06-05 23:27:42', '1', 'py_3PORMlIqj90TtX550HSWZrYM', 76, 'Order'),
	(37, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3POS5aIqj90TtX550nvJjgvn', '2024-06-06 00:14:01', '1', 'py_3POS5aIqj90TtX550nvJjgvn', 74, 'Order'),
	(38, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3POSMCIqj90TtX552o3hnyaf', '2024-06-06 00:31:38', '1', 'py_3POSMCIqj90TtX552o3hnyaf', 76, 'Order');

-- Volcando estructura para tabla database_web.old_passwords
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `old_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `change_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.old_passwords: ~0 rows (aproximadamente)
DELETE FROM `old_passwords`;

-- Volcando estructura para tabla database_web.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  `order_status` enum('pendiente','en proceso','enviado','entregado','cancelado','devuelto','fallido') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pendiente',
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.orders: ~2 rows (aproximadamente)
DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `order_status`, `details`, `shipping_address`) VALUES
	('py_3PORIcIqj90TtX553MdxwoAD', 74, '2024-06-05 23:23:19', 'pendiente', '[{"product_id":109,"quantity":1}]', '{"address_id":51,"user_id":74,"street":"c/ Doctor Fleming 6 3ºA","city":"Coslada","province":"Madrid","country":"España","zip":"28821","phone_number":602240748,"is_default":1}'),
	('py_3PORIHIqj90TtX550roCD3f6', 76, '2024-06-05 23:23:04', 'en proceso', '[{"product_id":109,"quantity":1}]', '{"address_id":66,"user_id":76,"street":"Plaza de Uruguay nº 7","city":"Coslada","province":"Madrid","country":"España","zip":"28822","phone_number":654203319,"is_default":0}'),
	('py_3PORMlIqj90TtX550HSWZrYM', 76, '2024-06-05 23:27:42', 'entregado', '[{"product_id":108,"quantity":1}]', '{"address_id":66,"user_id":76,"street":"Plaza de Uruguay nº 7","city":"Coslada","province":"Madrid","country":"España","zip":"28822","phone_number":654203319,"is_default":0}'),
	('py_3POS5aIqj90TtX550nvJjgvn', 74, '2024-06-06 00:13:55', 'pendiente', '[{"product_id":110,"quantity":1},{"product_id":107,"quantity":1},{"product_id":108,"quantity":1},{"product_id":106,"quantity":1}]', '{"address_id":51,"user_id":74,"street":"c/ Doctor Fleming 6 3ºA","city":"Coslada","province":"Madrid","country":"España","zip":"28821","phone_number":602240748,"is_default":1}'),
	('py_3POSMCIqj90TtX552o3hnyaf', 76, '2024-06-06 00:31:38', 'pendiente', '[{"product_id":105,"quantity":1}]', '{"address_id":65,"user_id":76,"street":"Plaza de Uruguay nº 7","city":"Coslada","province":"Madrid","country":"España","zip":"28822","phone_number":654203319,"is_default":1}');

-- Volcando estructura para tabla database_web.password_reset_codes
CREATE TABLE IF NOT EXISTS `password_reset_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `used` enum('1','0') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_USER_RESET_PASSWORD` (`user_id`),
  CONSTRAINT `FK_USER_RESET_PASSWORD` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.password_reset_codes: ~0 rows (aproximadamente)
DELETE FROM `password_reset_codes`;
INSERT INTO `password_reset_codes` (`id`, `user_id`, `code`, `created_at`, `used`) VALUES
	(2, 74, '134614', '2024-06-04 23:04:32', '0');

-- Volcando estructura para tabla database_web.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `id_brand` int NOT NULL,
  `status` enum('Enabled','Disabled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Disabled',
  `category_id` int NOT NULL,
  `stripe_product_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stripe_price_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `id_brand` (`id_brand`),
  KEY `category_ibfk_1` (`category_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `FK_products_database_web.brands` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.products: ~9 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `stripe_product_id`, `stripe_price_id`, `registration_date`) VALUES
	(105, '12 x Protein Snack 30g Chocolate belga ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Enabled', 76, 'prod_QENho9lppwYX6t', 'price_1PNuwDIqj90TtX55JPHelWqz', '2024-06-04 10:49:57'),
	(106, '12 x Protein Snack 30g Chocolate blanco con frambuesas ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QENqAA3MBCprlk', 'price_1PNv4TIqj90TtX552fcfKqo9', '2024-06-04 10:58:29'),
	(107, '12 x Protein Snack 30g Chocolate-Avellana', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1124, 1, 'Disabled', 77, 'prod_QENwUDJVe6DUhp', 'price_1PNvApIqj90TtX55Tvtdc0L0', '2024-06-04 11:05:03'),
	(108, '12 x Protein Snack 30g Chocolate-Coco', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 78, 'prod_QENzHVIwUcK85A', 'price_1PNvDNIqj90TtX55dfzqej0R', '2024-06-04 11:07:41'),
	(109, '12 x Protein Snack 30g Chocolate-Galletas de Crema', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QEO3X72ujJXrhl', 'price_1PNvHcIqj90TtX55qj6wSTO0', '2024-06-04 11:12:04'),
	(110, '12 x Protein Snack 30g Chocolate-Helado de Vainilla', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QEO6RJbyub4ttR', 'price_1PNvKYIqj90TtX5584LNVgJ2', '2024-06-04 11:15:06'),
	(111, '12 x Protein Snack 30g Chocolate-Tofe', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QEO97ItjjoQa0b', 'price_1PNvNNIqj90TtX55OX04nZCp', '2024-06-04 11:18:02');

-- Volcando estructura para tabla database_web.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
  `user_id` int NOT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `zip` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` int NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_address: ~4 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`, `is_default`) VALUES
	(51, 74, 'c/ Doctor Fleming 6 3ºA', 'Coslada', 'España', '28821', 'Madrid', 602240748, 1),
	(64, 74, 'c/ Doctor Fleming', 'a', 'España', '28821', 'Madrid', 602222222, 0),
	(65, 76, 'Plaza de Uruguay nº 7', 'Coslada', 'España', '28822', 'Madrid', 654203319, 1),
	(66, 76, 'Plaza de Uruguay nº 7', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(67, 76, 'Plaza de Uruguay nº 7', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0);

-- Volcando estructura para tabla database_web.user_credentials
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `current_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('Active','Inactive','Suspended') NOT NULL DEFAULT 'Active',
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`, `stripe_customer_id`, `status`, `registration_date`) VALUES
	(74, 'adrian.escribano3@gmail.com', '$2b$10$HXHGnAqfSS0Ol0E3uL0QJO56iWDFgd1.bS5kMyXrks43JuQleMvl.', 'cus_QCI0KGiumt3oRZ', 'Active', '2024-05-29 20:49:15'),
	(76, 'adrigar250503@gmail.com', '$2b$10$OAi36395/5qSpyr9UApVgOmi.mrbkH0e40pHCSIoKNwTNepaOTjI.', 'cus_QEY0k1Thubiz8y', 'Active', '2024-06-04 23:29:22');

-- Volcando estructura para tabla database_web.user_info
CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_info: ~2 rows (aproximadamente)
DELETE FROM `user_info`;
INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `dni`) VALUES
	(74, 'Adrián', 'Escribano', '49814242z'),
	(76, 'Adrian', 'Garcia', '49815997k');

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
	(74, 99),
	(76, 99);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
