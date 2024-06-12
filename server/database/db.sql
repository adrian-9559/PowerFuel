-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.37-0ubuntu0.22.04.3 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.1.0.6537
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.brands: ~0 rows (aproximadamente)
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
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  CONSTRAINT `FK_Order_Notification` FOREIGN KEY (`reference`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_Notification` FOREIGN KEY (`notification_user`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.notification: ~2 rows (aproximadamente)
DELETE FROM `notification`;

-- Volcando estructura para tabla database_web.old_passwords
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `old_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `change_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.old_passwords: ~13 rows (aproximadamente)
DELETE FROM `old_passwords`;
INSERT INTO `old_passwords` (`id`, `user_id`, `old_password`, `change_date`) VALUES
	(4, 78, '$2b$10$ZgCO3QMiRBp0JLuy9zaEm.npQjjF9naJuR42Ebkv1wyUWxGJg1ogG', '2024-06-08 20:15:03'),
	(5, 78, '$2b$10$MmDOlYGHCvdKoopIz.l.j.Wb2UyABqUKIIxV1c1k98sz0farfXJYq', '2024-06-09 16:17:03'),
	(6, 78, '$2b$10$Zvjyl.6LqwSlbY1OZ0GSROygJ.HJ7s/Y4B4vFVsIvsNvLOQkn9Nce', '2024-06-09 16:20:20'),
	(7, 78, '$2b$10$RAzCldZxy6xAX5eutgfM7eR7Dk0CUX4sSiMjpUA9c/gV.2qSZA2Ne', '2024-06-09 16:25:25'),
	(8, 78, '$2b$10$/yz1BM6t/Gg/Vx4mUHPkeeUP3WiCMThrQjxKtBRWGx1e04fWezG9S', '2024-06-09 16:27:46'),
	(9, 78, '$2b$10$/yz1BM6t/Gg/Vx4mUHPkeeUP3WiCMThrQjxKtBRWGx1e04fWezG9S', '2024-06-09 16:35:34'),
	(10, 78, '$2b$10$FH7Nyxa67yd04bQv9pkqJOGaYr8nCtSA67ahglW9ueY/pXMsrVHzu', '2024-06-09 16:36:17'),
	(11, 78, '$2b$10$OGHzy9sapZ4BeLY3gJCnd.uFURuGeBgCpDGp8t7ocnS20Iyc0lBGm', '2024-06-09 16:37:19'),
	(12, 78, '$2b$10$MCIyxOO059WjQCMlg8N2bei2DS/uYE6uYgc3lMBipCDJm1qIMMfui', '2024-06-09 16:38:07'),
	(13, 78, '$2b$10$/1OQN6NJKZJE9qWE0q0nxu71ft94eAwp4buK2a2WS.I8wF6m2/Kg.', '2024-06-09 16:39:07'),
	(14, 78, '$2b$10$ZM9CBbY/eOl7C7xW4N.aBORaOhq2dIt4O4NgMU9VlbMmulkaQfA1K', '2024-06-09 16:39:56'),
	(15, 78, '$2b$10$GXaXUAGV6NhIIieMGxkdtez14v9VBkhq6lNXmo7PDmvDZWLYMtZV.', '2024-06-09 16:41:24'),
	(16, 78, '$2b$10$5rxJLBBtZFAOMYtPGr3iL.Xj2jcI/RelteQslKkeHrda4C7WXcpN6', '2024-06-09 16:41:44'),
	(18, 78, '$2b$10$2HpgEKW9IYiG7/JWDQp35O6fbmM.As8RO0OwELhTbZvqoJ0Cl1Ori', '2024-06-12 02:50:21');

-- Volcando estructura para tabla database_web.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `status` enum('pendiente','en proceso','enviado','entregado','cancelado','devuelto','fallido','en proceso de devolucion') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_orders_database_web.user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.orders: ~2 rows (aproximadamente)
DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `status`, `details`, `shipping_address`) VALUES
	('py_3PQf2YIqj90TtX550uaYvwkX', NULL, '2024-06-12 02:27:59', 'entregado', '[{"product_id":158,"quantity":2}]', '{"street":"Plaza de Uruguay nº 7","city":"Coslada","zip":"28822","province":"Madrid","country":"España","phone_number":654203319}'),
	('py_3PQfDqIqj90TtX551Plmqgz4', NULL, '2024-06-12 02:39:38', 'cancelado', '[{"product_id":107,"quantity":1},{"product_id":153,"quantity":5}]', '{"address_id":77,"user_id":105,"street":"Plaza de Uruguay nº 7","city":"Coslada","province":"Madrid","country":"España","zip":"28822","phone_number":654203319,"is_default":0}');

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.password_reset_codes: ~0 rows (aproximadamente)
DELETE FROM `password_reset_codes`;
INSERT INTO `password_reset_codes` (`id`, `user_id`, `code`, `created_at`, `used`) VALUES
	(4, 79, '986232', '2024-06-09 18:46:32', '0'),
	(23, 78, '604706', '2024-06-12 02:50:01', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.products: ~6 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `stripe_product_id`, `stripe_price_id`, `registration_date`) VALUES
	(106, '12 x Protein Snack 30g Chocolate blanco con frambuesas ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QENqAA3MBCprlk', 'price_1PNv4TIqj90TtX552fcfKqo9', '2024-06-04 10:58:29'),
	(107, '12 x Protein Snack 30g Chocolate-Avellana', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1110, 1, 'Enabled', 77, 'prod_QENwUDJVe6DUhp', 'price_1PNvApIqj90TtX55Tvtdc0L0', '2024-06-04 11:05:03'),
	(108, '12 x Protein Snack 30g Chocolate-Coco', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 78, 'prod_QENzHVIwUcK85A', 'price_1PNvDNIqj90TtX55dfzqej0R', '2024-06-04 11:07:41'),
	(109, '12 x Protein Snack 30g Chocolate-Galletas de Crema', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QEO3X72ujJXrhl', 'price_1PNvHcIqj90TtX55qj6wSTO0', '2024-06-04 11:12:04'),
	(110, '12 x Protein Snack 30g Chocolate-Helado de Vainilla', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QEO6RJbyub4ttR', 'price_1PNvKYIqj90TtX5584LNVgJ2', '2024-06-04 11:15:06'),
	(111, '12 x Protein Snack 30g Chocolate-Tofe', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QEO97ItjjoQa0b', 'price_1PNvNNIqj90TtX55OX04nZCp', '2024-06-04 11:18:02'),
	(144, 'Crema de cacahuete 1000 g', '100% cacahuetes\r\nde calidad superior.\r\n¡Nada más!\r\n\r\nLa Crema de Cacahuete de Prozis está hecha con un solo ingrediente: ¡cacahuetes!\r\n\r\nEs la crema para untar o el complemento con sabor a frutos secos más delicioso y natural para tus batidos. Además de ser una fuente saludable de proteína, los cacahuetes también te proporcionan cantidades importantes de fibra, vitamina E y magnesio.\r\n\r\nEl magnesio es especialmente importante para las personas que siguen un estilo de vida activo y realizan ejercicio físico, ya que favorece la función muscular y la síntesis proteica, además de reducir el cansancio y la fatiga.\r\n\r\nHaz cálculos: por cada 100 g de crema de cacahuete, 26 g son proteínas y solo 11 g son hidratos de carbono. Esta proporción, en combinación con la composición general de nutrientes y una fórmula sin sal añadida, edulcorantes ni aromas artificiales convierte a la Crema de cacahuete de Prozis en una excelente alternativa para las personas que buscan lo mejor de lo mejor en el ámbito de la nutrición.\r\n\r\nSin sal añadida\r\nSin aromas artificiales\r\nSin azúcares añadidos*\r\nProducto vegano\r\n\r\nLa «crème de la crème»\r\n\r\nElaborada con el mejor cacahuete del mundo: el cacahuete «runner» argentino, con alto contenido en ácido oleico\r\nUtilizamos la variedad de cacahuete más excepcional, procedente del mejor origen, para preparar tu crema de cacahuete favorita:\r\n\r\nLa Crema de cacahuete de Prozis está elaborada 100% con el cacahuete argentino de la variedad «runner», con alto contenido en alto oleico. ¡Nada más!\r\n\r\n\r\n', 7.69, 1000, 1, 'Disabled', 91, 'prod_QHC9MaXwWL214H', 'price_1PQdlVIqj90TtX550zXtjVVb', '2024-06-12 01:06:10'),
	(151, '25 x Zero Break Duo', '¡Toca disfrutar de un capricho sin culpa!\r\n¡La decisión está en tus manos!\r\n\r\nEste es el tipo de snack que buscas, el que estimula tu imaginación mientras saboreas el mejor de los aperitivos y cuida tu cuerpo y tus planes de dieta. ¡Pruébalo! Empieza el viaje, disfruta de todos esos lugares increíbles y misteriosos donde una galleta barquillo crujiente revela una serena y cremosa ola de chocolate. Quédate ahí, no abandones la escena todavía porque lo mejor está a punto de llegar: una fina capa de chocolate con leche que aporta una sensación de calidez y te hará sentir más cómodo que nunca. No tienes que abandonar este viaje. ¡Recuerda que es DÚO! Tienes otra barrita, ¡por eso puedes volver a empezar!', 18.99, 1123, 1, 'Disabled', 76, 'prod_QHCMNkrMNXhKMm', 'price_1PQdxtIqj90TtX55z27qihng', '2024-06-12 01:18:57'),
	(153, '12 x Zero Protein Bar Caramelo Bajo contenido en azúcares', '¿Sueles sentir ese antojo por algo dulce y totalmente irresistible? Ya no tienes que cargar con todo ese peso en tu conciencia, ¡ahora tienes a tu alcance una solución saludable y disponible en diversos sabores!\r\n\r\nZero Protein Bar de Prozis es la opción perfecta que te aportará el auténtico placer de un aperitivo real y saciante, ¡pero con la seguridad de que estás haciendo una elección mucho más saludable!\r\n\r\n¡ELIGE ESTAR EN FORMA!\r\n\r\nProzis Zero, con todos los productos que componen la gama, trata de ofrecer alternativas a las personas que evitan los azúcares presentes en los productos cotidianos. Desde salsas hasta aperitivos de chocolate, cuenta con muchas opciones deliciosas que pueden marcar la diferencia y te ayudan a mantener la línea. Cero preocupaciones, placer absoluto.', 16.88, 117, 1, 'Enabled', 76, 'prod_QHCSzWKJ3K4tAp', 'price_1PQe3AIqj90TtX552TO0Y8DP', '2024-06-12 01:24:24'),
	(154, '12 x Zero Wafer 40 g Bajo en azúcar Chocolate Negro Barquillo proteico', 'DI SÍ A LOS BARQUILLOS\r\n¿Tus antojos vuelven a estar al mando? ¿Haces todo lo posible para no caer en la tentación de comer dulces y comida basura? Antes de que empieces a imaginar barritas de chocolate extrañamente seductoras que te guiñan el ojo e intentan seducirte, contrólate y sigue leyendo. ¿Sabes qué?, los antojos son algo natural. La cuestión es saber enfrentarse a ellos y elegir el aperitivo adecuado para darte un capricho.\r\n\r\nLos Barquillos Zero de Prozis son precisamente eso. Aportan satisfacción y placer sin dejar de lado el auténtico valor nutricional, lo que significa que puedes disfrutar de ellos sin sentirte culpable. ¡Di sí a los barquillos!\r\n\r\n¡CERO DUDAS!\r\n\r\nEn comparación con un barquillo de chocolate*, los Barquillos Zero de Prozis presentan características únicas y beneficiosas. Compruébalo tú mismo:', 20.28, 123, 1, 'Disabled', 78, 'prod_QHCU3DP5vmwNrt', 'price_1PQe5YIqj90TtX5578kiaMWh', '2024-06-12 01:26:52'),
	(155, '12 x Protein Wafer 40 g', 'Tu aperitivo crujiente para una pausa sabrosa\r\n¿Toca hacer una pausa? ¿Te apetece algo delicioso y crujiente? Tenemos el mejor aperitivo para ti: un barquillo proteico delicioso, con la mitad de azúcares que uno normal y menos contenido en hidratos de carbono. Una buena opción en cualquier momento para mayor sensación de plenitud y saciedad. ¡Prueba uno y verás como te apetece otro!\r\n\r\n¡Deliciosos barquillos!\r\n\r\nSabor a chocolate\r\nLa gran tentación entre horas. ¡Una delicia para los amantes del chocolate!\r\n\r\nSabor a vainilla\r\nLa esencia más dulce para los momentos deliciosos. ¡Date un capricho!', 23.88, 12342, 1, 'Enabled', 78, 'prod_QHCaRZzTYsqxtX', 'price_1PQeBFIqj90TtX55zY09m4a8', '2024-06-12 01:32:45'),
	(158, '12 x Protein Wafer 40 g Vainilla', 'Tu aperitivo crujiente para una pausa sabrosa\r\n\r\n¿Toca hacer una pausa? ¿Te apetece algo delicioso y crujiente? Tenemos el mejor aperitivo para ti: un barquillo proteico delicioso, con la mitad de azúcares que uno normal y menos contenido en hidratos de carbono. Una buena opción en cualquier momento para mayor sensación de plenitud y saciedad. ¡Prueba uno y verás como te apetece otro!\r\n\r\n¡Deliciosos barquillos!\r\n\r\nSabor a chocolate\r\nLa gran tentación entre horas. ¡Una delicia para los amantes del chocolate!\r\n \r\nSabor a vainilla\r\nLa esencia más dulce para los momentos deliciosos. ¡Date un capricho!', 23.88, 121, 1, 'Enabled', 78, 'prod_QHChkjnCW7cHjO', 'price_1PQeICIqj90TtX55dU4shU1q', '2024-06-12 01:39:56');

-- Volcando estructura para tabla database_web.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- Volcando estructura para tabla database_web.support_tickets
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Problema de Pago','Problema de Envío','Producto Dañado','Producto Incorrecto','Consulta de Producto','Solicitud de Reembolso','Problema de Inicio de Sesión','Problema de Cuenta','Otro') NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.support_tickets: ~2 rows (aproximadamente)
DELETE FROM `support_tickets`;
INSERT INTO `support_tickets` (`ticket_id`, `email`, `name`, `type`, `message`) VALUES
	(1, 'adrigar250503@gmail.com', 'Paco', 'Otro', 'Hola me gusta el chuchi'),
	(2, 'adrigar250503@gmail.com', 'Paco', 'Otro', 'Hola me gusta el chuchi'),
	(3, 'adrigar250503@gmail.com', 'Adrián', 'Solicitud de Reembolso', 'Tengo un problema');

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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_address: ~3 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`, `is_default`) VALUES
	(68, 78, 'Plaza de Uruguay, 8 28822 Coslada Madrid, España, 9° C', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(69, 79, 'C/Doctor Fleming', 'Coslada', 'España', '28821', 'Comunidad de Madrid', 602240748, 1),
	(71, 79, 'C/San Patricio', 'Madrid', 'España', '28082', 'Comunidad de Madrid', 123455698, 0);

-- Volcando estructura para tabla database_web.user_credentials
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `current_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('Activo','Inactivo','Suspendido') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Activo',
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`, `stripe_customer_id`, `status`, `registration_date`) VALUES
	(78, 'adrigar250503@gmail.com', '$2b$10$8ibKDhGHtvRGh/jVFuqaf.s4wXriBBn3bvmUDogxxUrxxHdZ8lts2', 'cus_QFtSI0obB5PLDZ', 'Activo', '2024-06-08 13:42:35'),
	(79, 'adrian.escribano3@gmail.com', '$2b$10$EXAyHVw3qdSjqOEFRdi8WeIhHnLx.wRzIumRWEZ7nGPzNTSZQAhue', 'cus_QFu3HwQHZVhzWb', 'Activo', '2024-06-08 14:20:02');

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
	(78, 'Adriáns', 'García Torrente', '49815997k'),
	(79, 'Adrián', 'Escribano Pérez', '49814242z');

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
	(78, 99),
	(79, 99);

-- Volcando estructura para disparador database_web.update_order_status_on_delete
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_order_status_on_delete` BEFORE DELETE ON `user_credentials` FOR EACH ROW BEGIN
    UPDATE orders
    SET status = 'cancelado'
    WHERE user_id = OLD.user_id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
