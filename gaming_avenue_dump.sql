mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 9.0.0, for Linux (x86_64)
--
-- Host: localhost    Database: gaming_avenue
-- ------------------------------------------------------
-- Server version	9.0.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Gaming','Everything related to gaming','2024-07-15 09:47:39','2024-07-15 09:47:39'),(2,'Alimentation','Food and beverages','2024-07-15 09:47:39','2024-07-15 09:47:39');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_address` text COLLATE utf8mb4_general_ci NOT NULL,
  `payment_status` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `order_status` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payments_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `numero_carte` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `date_expiration_carte` date NOT NULL,
  `cvc_carte` varchar(4) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_carte` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payments_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `subcategory_id` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,8,'ASUS ROG Strix G18','Jouez en toute confiance gr├óce ├á Windows 11 Pro et ├á la puissance brute du Strix G18 2024. Aliment├® par un processeur Intel┬« CoreÔäó i9 14900HX et jusqu\'├á un GPU pour ordinateur portable NVIDIA GeForce RTX 4080 affichant un TGP maximal de 175 W avec Dynamic Boost, pr├®parez-vous ├á dominer vos concurrents dans tous les jeux les plus r├®cents. Accompagn├® d\'un Switch MUX d├®di├® et de NVIDIA Advanced Optimus, le G18 lib├¿re le v├®ritable potentiel de son mat├®riel. Gr├óce au stockage SSD PCIe Gen4x4 et jusqu\'├á 32Go de RAM DDR5 ├á 5600 MHz, les immenses biblioth├¿ques de jeux et les sessions intenses de multit├óche n\'effraient pas cette machine gaming.',2999.99,20,NULL,'2024-07-15 11:49:49','2024-07-15 12:43:59'),(2,8,'MSI Katana 15','Les GPU NVIDIA┬« GeForce RTXÔäó s├®rie 40 offrent une rapidit├® extr├¬me aux gamers et aux cr├®ateurs. Bas├®s sur l\'architecture NVIDIA Ada Lovelace ├á haut degr├® dÔÇÖefficacit├®, ces GPU constituent une avanc├®e d├®cisive en mati├¿re de performances gr├óce au DLSS 3 bas├® sur l\'IA et au ray tracing qui assure des images ultrar├®alistes. De plus, la suite de technologies Max-Q optimise les performances du syst├¿me, l\'alimentation, l\'autonomie de la batterie et le niveau de bruit, pour une efficacit├® plus ├®lev├®e.',1499.99,15,NULL,'2024-07-15 12:00:19','2024-07-15 12:16:36'),(3,8,'OMEN TRANSCEND 14','Transcende ton gameplay avec la nouvelle architecture GPU NVIDIA Ada Lovelace, le DLSS 3.5 et le Ray Tracing am├®lior├® par lÔÇÖIA. Repousse les limites des applications de cr├®ation gr├óce ├á RTX et aux outils NVIDIA Studio acc├®l├®r├®s par lÔÇÖIA, d├®di├®s aux cr├®ateurs',2499.99,10,NULL,'2024-07-15 12:04:11','2024-07-15 12:13:38'),(4,9,'ASUS ROG STRIX GT15','Con├ºu tout particuli├¿rement pour les gamers adeptes de LAN party, le PC Gamer ASUS ROG STRIX GT15 allie puissance, praticit├® et ├®l├®gance au service du divertissement num├®rique. Facile ├á transporter, gr├óce ├á sa poign├®e int├®gr├®e, ce PC Gamer ASUS offre aussi l\'avantage d\'une mise ├á niveau simplifi├®e. Avec un processeur Intel Core i5-12400F, 16 Go de m├®moire DDR4, un SSD M.2 PCIe de 512 Go une carte graphique NVIDIA GeForce RTX 3060 Ti, ce PC Gamer ASUS ROG STRIX GT15 G15CF vous offre la puissance et la vitesse dont vous avez besoin pour jouer dans d\'excellentes conditions.',1799.99,10,NULL,'2024-07-15 12:13:23','2024-07-15 12:13:34'),(5,9,'MSI MAG Infinite S3','Le PC Gamer MSI MAG Infinite S3 14NUC5 est taill├® pour le gaming non-stop. Gr├óce ├á ses composants ultra-performants et ses fonctionnalit├®s avanc├®es, il offre de hautes performances et une excellente qualit├® audio/vid├®o, pour une exp├®rience de jeu vraiment confortable. Le MSI MAG Infinite S3 14NUC5-1437EU offre de hautes performances gr├óce ├á son processeur Intel Core i5-14400F, ses 16 Go de m├®moire et sa carte graphique MSI GeForce RTX 4060. De plus, avec son SSD M.2 PCIe de 1 To, vous profitez ├á la fois d\'un fonctionnement ultra-rapide et d\'une grande capacit├® de stockage.',1099.99,0,NULL,'2024-07-15 12:43:24','2024-07-16 08:33:45'),(6,10,'ASUS 27\" LED - VG27AQ','Performances, immersion et ├®motions. Le moniteur ASUS TUF Gaming VG27AQ est pr├¬t ├á vous faire passer au niveau sup├®rieur du gaming et a, dans cette optique, ├®t├® dot├® d\'un formidable arsenal technologique. Profitez d\'une dalle IPS de 27\" en r├®solution WQHD (2560 x 1440) pour red├®couvrir vos jeux favoris et frayez-vous un chemin vers la victoire ├á l\'aide d\'un taux de rafra├«chissement pouss├® ├á 165 Hz, ├®paul├® par 1 ms de temps de r├®ponse ! Ce moniteur dispose ├®galement d\'une arme secr├¿te, l\'ELMB-Sync, qui permet d\'activer ├á la fois la technologie G-Sync (avec laquelle il est compatible) et la technologie ULMB (Ultra Low Motion Blur). De cette mani├¿re, vous n\'aurez plus ├á choisir entre fluidit├® parfaite sans d├®chirements ou la diminution du ghosting lors des phases d\'action rapides.',259.00,20,NULL,'2024-07-15 12:48:48','2024-07-15 12:49:28'),(7,10,'BenQ 27\" LED - MOBIUZ EX2710Q','Prenez part ├á une exp├®rience gaming immersive avec l\'├®cran QHD BenQ Mobiuz EX2710Q ! Ce mod├¿le ├á dalle IPS de 27 pouces propose un environnement de jeu optimal avec une grande fluidit├®, une qualit├® visuelle sup├®rieure et un rendu des couleurs et des contrastes saisissants. Lancez votre jeu pr├®f├®r├® et profitez de conditions r├¬v├®es pour tenter de d├®crocher la victoire !',389.00,15,NULL,'2024-07-15 12:52:00','2024-07-15 12:52:07'),(8,10,'iiyama 27\" LED - G-Master GB2770QSU-B5','Pr├®parez-vous pour la bataille ├á venir avec un ├®quipement par├® pour la victoire. Le moniteur iiyama GB2770QSU-B5 combine avec efficacit├® une qualit├® d\'image sup├®rieure avec des performances gaming ├®lev├®es (temps de r├®ponse de 0.5 ms, fr├®quence de 165 Hz, FreeSync Premium Pro). Profitez d\'un divertissement agr├®able et confortable avec une dalle Fast IPS, une r├®solution QHD et une conception ergonomique.',259.00,25,NULL,'2024-07-15 12:55:58','2024-07-15 12:56:29'),(9,10,'Acer 27\" LED - CB272Usmiiprx','Dot├® d\'un design moderne sans bords sur 3 c├┤t├®s, le moniteur Acer CB272Usmiiprx est un outil polyvalent capable de vous accompagner aussi bien pour de la bureautique que pour de la retouche photo ou m├¬me des jeux vid├®o. Sa dalle IPS de 27 pouces en r├®solution WQHD (2560 x 1440 pixels) offre des couleurs vives et profondes pour une immersion maximale. Les 1 ms de temps de r├®ponse associ├®s ├á la technologie FreeSync et au taux de rafra├«chissement rapide de 75 Hz peuvent ├®galement transformer ce moniteur en une plateforme de jeu d\'une redoutable efficacit├® durant vos moments de d├®tente.',199.00,30,NULL,'2024-07-15 13:18:56','2024-07-15 13:19:07'),(10,10,'Logitech G G515 TKL Lightspeed','Foncez vers la victoire avec le clavier Logitech G G515 TKL Lightspeed. Au format TKL, ce clavier gaming est ├®quip├® des switches m├®caniques lin├®aires avanc├®s GL Red pour une sensation plus douce, un d├®clenchement rapide et une frappe pr├®cise. Quant ├á la technologie LightSync RGB, chaque touche du clavier peut ├¬tre personnalis├®e avec 16,8 millions de couleurs.',149.00,50,NULL,'2024-07-15 13:21:04','2024-07-15 13:21:12'),(11,10,'Logitech G G915 Tenkeyless Lightspeed Carbone','Rigoureusement con├ºu ├á partir de mat├®riaux premium, le clavier Logitech G915 TKL Lightspeed est dot├® d\'un design sophistiqu├®, d\'une robustesse ├á toute ├®preuve et de performances sans pr├®c├®dent. ├ëquip├® de la technologie sans fil Lightspeed, vous b├®n├®ficiez d\'une r├®activit├® extr├¬mement rapide d\'une milliseconde pour prendre plus facilement le dessus sur vos adversaires. Ce n\'est pas tout, il embarque de nouveaux switchs m├®caniques ultra-plats hautes performances ainsi que la technologie RVB Lightsync pour vous permettre d\'entrer dans une toute nouvelle dimension.',239.00,40,NULL,'2024-07-15 13:24:11','2024-07-15 13:24:29'),(12,10,'ASUS ROG Harpe Ace Moonlight','Prenez le dessus sur vos adversaires avec une facilit├® d├®concertante gr├óce ├á la souris sans fil ASUS ROG Harpe Ace. Gr├óce ├á son capteur optique ROG AimPoint de 36 000 dpi, elle offre une pr├®cision chirurgicale. Son design ergonomique vous apporte confort et facilit├® d\'utilisation lorsque vous jouez pendant de longues heures. Con├ºue pour les champions d\'eSports et les joueurs professionnels en puissance, cette souris ultral├®g├¿re de 54 grammes comprend la fonction Aim Lab Settings Optimizer qui mesure et analyse les performances du joueur pour cr├®er la meilleure combinaison de param├¿tres possible, en fonction de vos points forts.',159.00,30,NULL,'2024-07-15 13:27:12','2024-07-15 13:27:29'),(13,10,'Corsair Dark Core RGB Pro SE','Proposant une connexion filaire (USB) et non filaire (Bluetooth/RF), la souris Dark Core RGB Pro SE de Corsair vous donne un avantage certain sur tous vos adversaires. ├ëquip├®e d\'un capteur optique de 18 000 dpi, elle offre des performances de gaming exceptionnelles. Cette souris allie pr├®cision et contr├┤le, et est de plus rechargeable via la technologie sans fil Qi.',119.00,30,NULL,'2024-07-15 13:43:13','2024-07-15 13:43:25'),(14,10,'Logitech G Pro X Gaming Headset','Con├ºu en collaboration avec de nombreux joueurs professionnels sur divers genres de jeux, le Logitech G Pro X Gaming Headset va vous permettre d\'entendre les sons de votre jeu avec pr├®cision. Avec des transducteurs Pro-G de 50 mm en similicuir isolants, un son surround DTS Headphone:X 2.0, un microphone de qualit├® professionnelle disposant de la technologie Blue Vo!ce et une construction l├®g├¿re, le Logitech G Pro X Gaming Headset est l\'accessoire id├®al pour les tournois intenses.',119.00,25,NULL,'2024-07-15 13:51:42','2024-07-15 13:54:50'),(15,10,'Corsair HS65','Le micro-casque Corsair HS65 offre confort, l├®g├¿ret├® et durabilit├® afin de vous garantir des heures de gameplay dans les meilleures conditions. Retrouvez un son surround Dolby Vision 7.1 pour une exp├®rience audio multicanale, mais ├®galement un microphone omnidirectionnel ou encore une compatibilit├® multiplateforme.',89.00,30,NULL,'2024-07-15 13:54:40','2024-07-15 13:54:53');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subcategory_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (8,1,'PC Portable','Gaming laptops','2024-07-15 09:48:57','2024-07-15 09:48:57'),(9,1,'PC Fixe','Gaming desktops','2024-07-15 09:48:57','2024-07-15 09:48:57'),(10,1,'P├®riph├®rique','Gaming peripherals','2024-07-15 09:48:57','2024-07-15 09:48:57'),(11,2,'Boisson','Beverages','2024-07-15 09:48:57','2024-07-15 09:48:57'),(12,2,'Charcuterie','Cured meats','2024-07-15 09:48:57','2024-07-15 09:48:57'),(13,2,'Chips','Snack chips','2024-07-15 09:48:57','2024-07-15 09:48:57'),(14,2,'Bonbon','Candies','2024-07-15 09:48:57','2024-07-15 09:48:57');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofiles`
--

DROP TABLE IF EXISTS `userprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofiles` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userprofiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofiles`
--

LOCK TABLES `userprofiles` WRITE;
/*!40000 ALTER TABLE `userprofiles` DISABLE KEYS */;
INSERT INTO `userprofiles` VALUES (1,1,'Damien','Raunier',NULL,'0683324880','2024-07-16 12:50:44','2024-07-16 12:50:44'),(2,2,'Damien','Raunier',NULL,'0683324880','2024-07-16 12:52:01','2024-07-16 12:52:01'),(3,3,'Baptiste','RINGLER',NULL,'0783475206','2024-07-16 18:00:44','2024-07-16 18:00:44'),(5,5,'test','test',NULL,'0783475206','2024-07-16 19:37:55','2024-07-16 19:37:55'),(6,6,'adminadmin','adminadmin',NULL,'0000000000','2024-07-16 19:40:56','2024-07-16 19:40:56');
/*!40000 ALTER TABLE `userprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrolesmapping`
--

DROP TABLE IF EXISTS `userrolesmapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrolesmapping` (
  `user_role_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `userrolesmapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `userrolesmapping_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `userroles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrolesmapping`
--

LOCK TABLES `userrolesmapping` WRITE;
/*!40000 ALTER TABLE `userrolesmapping` DISABLE KEYS */;
INSERT INTO `userrolesmapping` VALUES (1,5,1),(2,6,2);
/*!40000 ALTER TABLE `userrolesmapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Damien','damienraunier@gmail.com','$2b$10$XAFEIIwoM53A4n8tWJocBOGpef3R81w8Hc1ikkVzndcN3PdWu5m2.','2024-07-16 12:50:44','2024-07-16 12:50:44'),(2,'Damien2','damienraunier2@gmail.com','$2b$10$0L9STkpt3gGzyIwu8BsPTOlyk5xnPAWPMjYclxakBhsq1KW59xY8u','2024-07-16 12:52:01','2024-07-16 12:52:01'),(3,'baptistee','ringlerbaptiste@gmail.com','$2b$10$MmF2j1RBpkkoR/Vql1ikquE2rZu7KLOsFEtn44c5CarlQ/HgY6I3K','2024-07-16 18:00:44','2024-07-16 18:18:20'),(5,'test12','test12@test.fr','$2b$10$IcxXB7r/UBnadbDlYBnTK.nnhcRlNvRkwk.LYwdEAmOeAct8l.iUW','2024-07-16 19:37:55','2024-07-16 19:37:55'),(6,'admin','admin@gmail.com','$2b$10$ycLwFmSdAyR0XSLeydrWVOcgA1cbJqE5QOIe.L43CREMGQU0MI8ca','2024-07-16 19:40:56','2024-07-16 19:40:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-16 19:50:49
