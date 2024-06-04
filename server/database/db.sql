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
  `brand_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.notification: ~0 rows (aproximadamente)
DELETE FROM `notification`;
INSERT INTO `notification` (`notification_id`, `title`, `description`, `notification_date`, `viewed`, `reference`, `notification_user`, `type`) VALUES
	(17, 'Pedido creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PMGKiIqj90TtX551fA0TDp2', '2024-05-30 21:16:33', '1', 'py_3PMGKiIqj90TtX551fA0TDp2', 74, 'Order');

-- Volcando estructura para tabla database_web.old_passwords
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `user_id` int NOT NULL,
  `previous_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `change_date` datetime NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.old_passwords: ~0 rows (aproximadamente)
DELETE FROM `old_passwords`;

-- Volcando estructura para tabla database_web.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  `order_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.orders: ~4 rows (aproximadamente)
DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `order_status`, `details`) VALUES
	('py_3PMGKiIqj90TtX551fA0TDp2', 74, '2024-05-30 00:00:00', 'pending', '[{"product_id":70,"quantity":1}]'),
	('py_3PNIj6Iqj90TtX552XURR2SK', 73, '2024-06-02 18:02:00', 'pending', '[{"product_id":70,"quantity":6},{"product_id":71,"quantity":6}]');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.password_reset_codes: ~0 rows (aproximadamente)
DELETE FROM `password_reset_codes`;

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
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.products: ~4 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `stripe_product_id`, `stripe_price_id`, `registration_date`) VALUES
	(105, '12 x Protein Snack 30g Chocolate belga ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Enabled', 77, 'prod_QENho9lppwYX6t', 'price_1PNuwDIqj90TtX55JPHelWqz', '2024-06-04 10:49:57'),
	(106, '12 x Protein Snack 30g Chocolate blanco con frambuesas ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QENqAA3MBCprlk', 'price_1PNv4TIqj90TtX552fcfKqo9', '2024-06-04 10:58:29'),
	(107, '12 x Protein Snack 30g Chocolate-Avellana', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 1.00, 1, 1, 'Disabled', 77, 'prod_QENwUDJVe6DUhp', 'price_1PNvApIqj90TtX55Tvtdc0L0', '2024-06-04 11:05:03'),
	(108, '12 x Protein Snack 30g Chocolate-Coco', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Disabled', 77, 'prod_QENzHVIwUcK85A', 'price_1PNvDNIqj90TtX55dfzqej0R', '2024-06-04 11:07:41'),
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_address: ~5 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`, `is_default`) VALUES
	(51, 74, 'c/ Doctor Fleming 6 3ºA', 'Coslada', 'España', '28821', 'Madrid', 602240748, 1),
	(61, 73, 'Plaza de Uruguay 7, Coslada, Madrid, España', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(62, 73, 'Plaza de Uruguay 7, Coslada, Madrid, España', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(63, 73, 'Plaza de Uruguay 7, Coslada, Madrid, España', 'Coslada', 'España', '28822', 'Madrid', 654203319, 1),
	(64, 74, 'c/ Doctor Fleming', 'a', 'España', '28821', 'Madrid', 602222222, 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`, `stripe_customer_id`, `status`, `registration_date`) VALUES
	(73, 'adrigar250503@gmail.com', '$2b$10$ETReeNIcBLMtvWojeg.phO1zerd/0sYMrMnCgebimzisr8dbVGICu', 'cus_QCH9XSpm87qPW1', 'Active', '2024-05-29 19:56:07'),
	(74, 'adrian.escribano3@gmail.com', '$2b$10$HXHGnAqfSS0Ol0E3uL0QJO56iWDFgd1.bS5kMyXrks43JuQleMvl.', 'cus_QCI0KGiumt3oRZ', 'Active', '2024-05-29 20:49:15');

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
