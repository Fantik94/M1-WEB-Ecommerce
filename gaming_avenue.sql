-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 19 juil. 2024 à 09:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gaming_avenue`
--

-- --------------------------------------------------------

--
-- Structure de la table `addresses`
--

CREATE TABLE `addresses` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `addresses`
--

INSERT INTO `addresses` (`address_id`, `user_id`, `street`, `city`, `state`, `postal_code`, `country`, `created_at`, `updated_at`) VALUES
(5, 8, '69 Avenue de la paix', 'Fresnes', 'asa', '94260', 'France', '2024-07-17 13:54:57', '2024-07-17 13:54:57'),
(7, 6, '69 Avenue de la paix', 'Fresnes', 'france', '94260', 'France', '2024-07-17 19:28:07', '2024-07-17 19:28:07'),
(12, 11, '69 Avenue de la paix', 'Fresnes', 'fracer', '94260', 'France', '2024-07-18 12:52:34', '2024-07-18 12:52:34'),
(13, 12, 'test', 'test', 'test', '92130', 'France', '2024-07-18 16:20:54', '2024-07-18 16:20:54'),
(14, 13, 'Rue Vieille du Temple', 'Paris', 'Ile de France', '75000', 'France', '2024-07-18 20:24:22', '2024-07-19 07:12:30'),
(15, 14, 'Rue Vieille du Temple', 'Paris', 'Ile de France', '75000', 'France', '2024-07-19 07:37:33', '2024-07-19 07:37:33');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Gaming', 'Everything related to gaming', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/categories/1_w8vxpz.jpg', '2024-07-15 09:47:39', '2024-07-17 22:25:50'),
(2, 'Alimentation', 'Food and beverages', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/categories/2_ru5ilt.jpg', '2024-07-15 09:47:39', '2024-07-17 22:25:29');

-- --------------------------------------------------------

--
-- Structure de la table `orderitems`
--

CREATE TABLE `orderitems` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_address` text NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_amount`, `shipping_address`, `payment_status`, `order_status`, `created_at`, `updated_at`) VALUES
(1, 6, 7199.98, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'Validée', '2024-07-17 19:41:45', '2024-07-17 21:10:25'),
(2, 6, 6479.96, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'En cours d\'acheminement', '2024-07-17 19:46:06', '2024-07-17 21:10:28'),
(3, 6, 1799.99, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'Livrée', '2024-07-17 20:05:01', '2024-07-17 21:10:34'),
(4, 6, 1799.99, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'Annulée', '2024-07-17 20:05:33', '2024-07-17 21:10:40'),
(23, 6, 10799.96, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'Processing', '2024-07-18 12:50:51', '2024-07-18 12:50:51'),
(24, 6, 10799.96, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'Processing', '2024-07-18 12:51:41', '2024-07-18 12:51:41'),
(25, 11, 10799.96, '69 Avenue de la paix, Fresnes, fracer, 94260, France', 'Paid', 'Processing', '2024-07-18 12:52:48', '2024-07-18 12:52:48'),
(26, 11, 17279.90, '69 Avenue de la paix, Fresnes, fracer, 94260, France', 'Paid', 'Processing', '2024-07-18 13:38:01', '2024-07-18 13:38:01'),
(38, 6, 1799.99, '69 Avenue de la paix, Fresnes, france, 94260, France', 'Paid', 'En cours d\'acheminement', '2024-07-18 20:00:59', '2024-07-18 20:01:28'),
(39, 13, 5999.98, 'rue des Bourcacac, Montgeron, csdsqdd, 91230, France', 'Paid', 'Processing', '2024-07-18 20:24:43', '2024-07-18 20:24:43'),
(40, 13, 2.40, 'rue des Bourcacac, Montgeron, csdsqdd, 91230, France', 'Paid', 'Processing', '2024-07-19 06:23:01', '2024-07-19 06:23:01'),
(41, 12, 28799.90, 'test, test, test, 92130, France', 'Paid', 'Processing', '2024-07-19 06:59:32', '2024-07-19 06:59:32'),
(42, 13, 3599.99, 'rue des Bourcacac, Montgeron, csdsqdd, 91230, France', 'Paid', 'Processing', '2024-07-19 07:00:14', '2024-07-19 07:00:14'),
(43, 13, 3599.99, 'rue des Bourcacac, Montgeron, csdsqdd, 91230, France', 'Paid', 'Processing', '2024-07-19 07:04:16', '2024-07-19 07:04:16'),
(44, 13, 3599.99, 'rue des Bourcacac, Montgeron, csdsqdd, 91230, France', 'Paid', 'Processing', '2024-07-19 07:09:47', '2024-07-19 07:09:47'),
(45, 13, 3599.99, 'Rue Vieille du Temple, Paris, Ile de France, 75000, France', 'Paid', 'Processing', '2024-07-19 07:19:18', '2024-07-19 07:19:18'),
(46, 13, 3599.99, 'Rue Vieille du Temple, Paris, Ile de France, 75000, France', 'Paid', 'Processing', '2024-07-19 07:20:13', '2024-07-19 07:20:13'),
(47, 14, 1828.79, 'Rue Vieille du Temple, Paris, Ile de France, 75000, France', 'Paid', 'Processing', '2024-07-19 07:37:56', '2024-07-19 07:37:56'),
(48, 14, 26999.82, 'Rue Vieille du Temple, Paris, Ile de France, 75000, France', 'Paid', 'Processing', '2024-07-19 07:39:50', '2024-07-19 07:39:50');

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `payments_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `numero_carte` varchar(20) NOT NULL,
  `date_expiration_carte` date NOT NULL,
  `cvc_carte` varchar(4) NOT NULL,
  `nom_carte` varchar(50) NOT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`payments_id`, `user_id`, `numero_carte`, `date_expiration_carte`, `cvc_carte`, `nom_carte`, `date_ajout`) VALUES
(2, 8, '5555555555555555', '2222-12-14', '555', 'SALUT', '2024-07-17 13:25:28'),
(3, 8, '4444444444444444', '2220-03-14', '114', 'dfg', '2024-07-17 14:03:12'),
(5, 6, '4444444444444444', '2200-03-14', '111', 'BOB test 1', '2024-07-17 19:28:27'),
(8, 11, '4444444444444444', '2024-07-06', '111', 'zderz', '2024-07-18 12:52:47'),
(9, 12, '1234123412341234', '2026-12-30', '123', 'Test', '2024-07-18 16:23:26'),
(10, 13, '1234123412341234', '2026-05-31', '123', 'Raunier', '2024-07-18 20:24:40'),
(11, 14, '1234123412341234', '2026-06-21', '123', 'Cascio', '2024-07-19 07:37:55');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`product_id`, `subcategory_id`, `name`, `description`, `price`, `stock`, `image1`, `image2`, `image3`, `created_at`, `updated_at`) VALUES
(1, 8, 'ASUS ROG Strix G18', 'Jouez en toute confiance grâce à Windows 11 Pro et à la puissance brute du Strix G18 2024. Alimenté par un processeur Intel® Core™ i9 14900HX et jusqu\'à un GPU pour ordinateur portable NVIDIA GeForce RTX 4080 affichant un TGP maximal de 175 W avec Dynamic Boost, préparez-vous à dominer vos concurrents dans tous les jeux les plus récents. Accompagné d\'un Switch MUX dédié et de NVIDIA Advanced Optimus, le G18 libère le véritable potentiel de son matériel. Grâce au stockage SSD PCIe Gen4x4 et jusqu\'à 32Go de RAM DDR5 à 5600 MHz, les immenses bibliothèques de jeux et les sessions intenses de multitâche n\'effraient pas cette machine gaming.', 2999.99, 20, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/1-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/1-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/1-3.jpg', '2024-07-15 11:49:49', '2024-07-17 22:43:36'),
(2, 8, 'MSI Katana 15', 'Les GPU NVIDIA® GeForce RTX™ série 40 offrent une rapidité extrême aux gamers et aux créateurs. Basés sur l\'architecture NVIDIA Ada Lovelace à haut degré d’efficacité, ces GPU constituent une avancée décisive en matière de performances grâce au DLSS 3 basé sur l\'IA et au ray tracing qui assure des images ultraréalistes. De plus, la suite de technologies Max-Q optimise les performances du système, l\'alimentation, l\'autonomie de la batterie et le niveau de bruit, pour une efficacité plus élevée.', 1499.99, 15, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/2-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/2-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/2-3.jpg', '2024-07-15 12:00:19', '2024-07-17 22:43:53'),
(3, 8, 'OMEN TRANSCEND 14', 'Transcende ton gameplay avec la nouvelle architecture GPU NVIDIA Ada Lovelace, le DLSS 3.5 et le Ray Tracing amélioré par l’IA. Repousse les limites des applications de création grâce à RTX et aux outils NVIDIA Studio accélérés par l’IA, dédiés aux créateurs', 2499.99, 10, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/3-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/3-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/3-3.jpg', '2024-07-15 12:04:11', '2024-07-17 22:44:10'),
(4, 9, 'ASUS ROG STRIX GT15', 'Conçu tout particulièrement pour les gamers adeptes de LAN party, le PC Gamer ASUS ROG STRIX GT15 allie puissance, praticité et élégance au service du divertissement numérique. Facile à transporter, grâce à sa poignée intégrée, ce PC Gamer ASUS offre aussi l\'avantage d\'une mise à niveau simplifiée. Avec un processeur Intel Core i5-12400F, 16 Go de mémoire DDR4, un SSD M.2 PCIe de 512 Go une carte graphique NVIDIA GeForce RTX 3060 Ti, ce PC Gamer ASUS ROG STRIX GT15 G15CF vous offre la puissance et la vitesse dont vous avez besoin pour jouer dans d\'excellentes conditions.', 1799.99, 10, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/4-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/4-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/4-3.jpg', '2024-07-15 12:13:23', '2024-07-17 22:44:25'),
(5, 9, 'MSI MAG Infinite S3', 'Le PC Gamer MSI MAG Infinite S3 14NUC5 est taillé pour le gaming non-stop. Grâce à ses composants ultra-performants et ses fonctionnalités avancées, il offre de hautes performances et une excellente qualité audio/vidéo, pour une expérience de jeu vraiment confortable. Le MSI MAG Infinite S3 14NUC5-1437EU offre de hautes performances grâce à son processeur Intel Core i5-14400F, ses 16 Go de mémoire et sa carte graphique MSI GeForce RTX 4060. De plus, avec son SSD M.2 PCIe de 1 To, vous profitez à la fois d\'un fonctionnement ultra-rapide et d\'une grande capacité de stockage.', 1099.99, 0, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/5-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/5-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/5-3.jpg', '2024-07-15 12:43:24', '2024-07-17 22:44:40'),
(6, 10, 'ASUS 27\" LED - VG27AQ', 'Performances, immersion et émotions. Le moniteur ASUS TUF Gaming VG27AQ est prêt à vous faire passer au niveau supérieur du gaming et a, dans cette optique, été doté d\'un formidable arsenal technologique. Profitez d\'une dalle IPS de 27\" en résolution WQHD (2560 x 1440) pour redécouvrir vos jeux favoris et frayez-vous un chemin vers la victoire à l\'aide d\'un taux de rafraîchissement poussé à 165 Hz, épaulé par 1 ms de temps de réponse ! Ce moniteur dispose également d\'une arme secrète, l\'ELMB-Sync, qui permet d\'activer à la fois la technologie G-Sync (avec laquelle il est compatible) et la technologie ULMB (Ultra Low Motion Blur). De cette manière, vous n\'aurez plus à choisir entre fluidité parfaite sans déchirements ou la diminution du ghosting lors des phases d\'action rapides.', 259.00, 20, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/6-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/6-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/6-3.jpg', '2024-07-15 12:48:48', '2024-07-17 22:45:02'),
(7, 10, 'BenQ 27\" LED - MOBIUZ EX2710Q', 'Prenez part à une expérience gaming immersive avec l\'écran QHD BenQ Mobiuz EX2710Q ! Ce modèle à dalle IPS de 27 pouces propose un environnement de jeu optimal avec une grande fluidité, une qualité visuelle supérieure et un rendu des couleurs et des contrastes saisissants. Lancez votre jeu préféré et profitez de conditions rêvées pour tenter de décrocher la victoire !', 389.00, 15, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/7-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/7-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/7-3.jpg', '2024-07-15 12:52:00', '2024-07-17 22:45:17'),
(8, 10, 'iiyama 27\" LED - G-Master GB2770QSU-B5', 'Préparez-vous pour la bataille à venir avec un équipement paré pour la victoire. Le moniteur iiyama GB2770QSU-B5 combine avec efficacité une qualité d\'image supérieure avec des performances gaming élevées (temps de réponse de 0.5 ms, fréquence de 165 Hz, FreeSync Premium Pro). Profitez d\'un divertissement agréable et confortable avec une dalle Fast IPS, une résolution QHD et une conception ergonomique.', 259.00, 25, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/8-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/8-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/8-3.jpg', '2024-07-15 12:55:58', '2024-07-17 22:45:31'),
(9, 10, 'Acer 27\" LED - CB272Usmiiprx', 'Doté d\'un design moderne sans bords sur 3 côtés, le moniteur Acer CB272Usmiiprx est un outil polyvalent capable de vous accompagner aussi bien pour de la bureautique que pour de la retouche photo ou même des jeux vidéo. Sa dalle IPS de 27 pouces en résolution WQHD (2560 x 1440 pixels) offre des couleurs vives et profondes pour une immersion maximale. Les 1 ms de temps de réponse associés à la technologie FreeSync et au taux de rafraîchissement rapide de 75 Hz peuvent également transformer ce moniteur en une plateforme de jeu d\'une redoutable efficacité durant vos moments de détente.', 199.00, 30, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/9-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/9-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/9-3.jpg', '2024-07-15 13:18:56', '2024-07-17 22:45:45'),
(10, 10, 'Logitech G G515 TKL Lightspeed', 'Foncez vers la victoire avec le clavier Logitech G G515 TKL Lightspeed. Au format TKL, ce clavier gaming est équipé des switches mécaniques linéaires avancés GL Red pour une sensation plus douce, un déclenchement rapide et une frappe précise. Quant à la technologie LightSync RGB, chaque touche du clavier peut être personnalisée avec 16,8 millions de couleurs.', 149.00, 50, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/10-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/10-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/10-3.jpg', '2024-07-15 13:21:04', '2024-07-17 22:46:04'),
(11, 10, 'Logitech G G915 Tenkeyless Lightspeed Carbone', 'Rigoureusement conçu à partir de matériaux premium, le clavier Logitech G915 TKL Lightspeed est doté d\'un design sophistiqué, d\'une robustesse à toute épreuve et de performances sans précédent. Équipé de la technologie sans fil Lightspeed, vous bénéficiez d\'une réactivité extrêmement rapide d\'une milliseconde pour prendre plus facilement le dessus sur vos adversaires. Ce n\'est pas tout, il embarque de nouveaux switchs mécaniques ultra-plats hautes performances ainsi que la technologie RVB Lightsync pour vous permettre d\'entrer dans une toute nouvelle dimension.', 239.00, 40, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/11-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/11-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/11-3.jpg', '2024-07-15 13:24:11', '2024-07-17 22:46:16'),
(12, 10, 'ASUS ROG Harpe Ace Moonlight', 'Prenez le dessus sur vos adversaires avec une facilité déconcertante grâce à la souris sans fil ASUS ROG Harpe Ace. Grâce à son capteur optique ROG AimPoint de 36 000 dpi, elle offre une précision chirurgicale. Son design ergonomique vous apporte confort et facilité d\'utilisation lorsque vous jouez pendant de longues heures. Conçue pour les champions d\'eSports et les joueurs professionnels en puissance, cette souris ultralégère de 54 grammes comprend la fonction Aim Lab Settings Optimizer qui mesure et analyse les performances du joueur pour créer la meilleure combinaison de paramètres possible, en fonction de vos points forts.', 159.00, 30, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/12-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/12-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/12-3.jpg', '2024-07-15 13:27:12', '2024-07-17 22:46:30'),
(13, 10, 'Corsair Dark Core RGB Pro SE', 'Proposant une connexion filaire (USB) et non filaire (Bluetooth/RF), la souris Dark Core RGB Pro SE de Corsair vous donne un avantage certain sur tous vos adversaires. Équipée d\'un capteur optique de 18 000 dpi, elle offre des performances de gaming exceptionnelles. Cette souris allie précision et contrôle, et est de plus rechargeable via la technologie sans fil Qi.', 119.00, 30, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/13-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/13-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/12-3.jpg', '2024-07-15 13:43:13', '2024-07-17 22:46:53'),
(14, 10, 'Logitech G Pro X Gaming Headset', 'Conçu en collaboration avec de nombreux joueurs professionnels sur divers genres de jeux, le Logitech G Pro X Gaming Headset va vous permettre d\'entendre les sons de votre jeu avec précision. Avec des transducteurs Pro-G de 50 mm en similicuir isolants, un son surround DTS Headphone:X 2.0, un microphone de qualité professionnelle disposant de la technologie Blue Vo!ce et une construction légère, le Logitech G Pro X Gaming Headset est l\'accessoire idéal pour les tournois intenses.', 119.00, 25, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/14-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/14-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/14-3.jpg', '2024-07-15 13:51:42', '2024-07-17 22:47:25'),
(15, 10, 'Corsair HS65', 'Le micro-casque Corsair HS65 offre confort, légèreté et durabilité afin de vous garantir des heures de gameplay dans les meilleures conditions. Retrouvez un son surround Dolby Vision 7.1 pour une expérience audio multicanale, mais également un microphone omnidirectionnel ou encore une compatibilité multiplateforme.', 89.00, 30, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/15-1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/15-2.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/images/15-3.jpg', '2024-07-15 13:54:40', '2024-07-17 22:47:41'),
(19, 11, 'Red Bull', 'Red Bull', 5.00, 1000000, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721304347/Gaming_avenue_images/images/Red%20Bull_image1_tA_lA_chargement.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721304347/Gaming_avenue_images/images/Red%20Bull_image2_images.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721304347/Gaming_avenue_images/images/Red%20Bull_image3_2526251.jpg', '2024-07-18 12:05:49', '2024-07-18 12:05:49'),
(20, 11, 'Coca Cola', 'Coca', 4.00, 200, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308067/Gaming_avenue_images/images/Coca%20Cola_image1_coca_33cl_0.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308067/Gaming_avenue_images/images/Coca%20Cola_image2_images__1_.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308067/Gaming_avenue_images/images/Coca%20Cola_image3_istockphoto_458464735_612x612.jpg', '2024-07-18 13:07:49', '2024-07-18 13:07:49'),
(21, 11, 'MONSTER', 'Monster', 2.00, 900, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308154/Gaming_avenue_images/images/MONSTER_image1_500x500.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308154/Gaming_avenue_images/images/MONSTER_image2_images__2_.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308154/Gaming_avenue_images/images/MONSTER_image3_IMG_1115.jpg', '2024-07-18 13:09:17', '2024-07-18 13:09:17'),
(22, 13, 'Chips Lays', 'Chips', 2.00, 27, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308222/Gaming_avenue_images/images/Chips%20Lays_image1_chips_nature.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308222/Gaming_avenue_images/images/Chips%20Lays_image2_640px_Kartoffelchips_1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308223/Gaming_avenue_images/images/Chips%20Lays_image3_shutterstock_795135682_1.jpg', '2024-07-18 13:10:25', '2024-07-18 13:10:25'),
(23, 13, 'Chips Pringles', 'Chips', 3.00, 60, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308308/Gaming_avenue_images/images/Chips%20Pringles_image1_shutterstock_795135682_1.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308308/Gaming_avenue_images/images/Chips%20Pringles_image2_s_l1200.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308308/Gaming_avenue_images/images/Chips%20Pringles_image3_2Z_431368.jpg', '2024-07-18 13:11:50', '2024-07-18 13:11:50'),
(24, 12, 'Baton de berger JUSTIN BRIDOU', 'Mini saucisson baton de berger nature JUSTIN BRIDOU', 3.00, 60, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308413/Gaming_avenue_images/images/B%C3%A2ton%20de%20berger%20JUSTIN%20BRIDOU_image1_mini_saucisson_baton_de_berger_nature_justin_bridou.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308413/Gaming_avenue_images/images/B%C3%A2ton%20de%20berger%20JUSTIN%20BRIDOU_image2_4080753_47df8bda7d5a12.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308413/Gaming_avenue_images/images/B%C3%A2ton%20de%20berger%20JUSTIN%20BRIDOU_image3_petits_saucissons_nature_justin_bridou_petits_saucissons_nature_justin_bridou.jpg', '2024-07-18 13:13:43', '2024-07-18 13:20:25'),
(25, 12, 'Auvernou Saucisson sec pur porc', 'Auvernou Saucisson sec pur porc', 3.00, 90, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308495/Gaming_avenue_images/images/Auvernou%20Saucisson%20sec%20pur%20porc_image1_61j42m_n2kL.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308495/Gaming_avenue_images/images/Auvernou%20Saucisson%20sec%20pur%20porc_image2_tA_lA_chargement.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308495/Gaming_avenue_images/images/Auvernou%20Saucisson%20sec%20pur%20porc_image3_616Wur7P84L.jpg', '2024-07-18 13:14:57', '2024-07-18 13:14:58'),
(26, 14, 'Bonbon Haribo', 'Bonbon', 4.00, 150, 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308570/Gaming_avenue_images/images/Bonbon%20Haribo_image1_haribo_dragibus_mini_sachets.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308570/Gaming_avenue_images/images/Bonbon%20Haribo_image2_haribo_pommes_sauer_200g_1200x1200.jpg', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721308570/Gaming_avenue_images/images/Bonbon%20Haribo_image3_haribo_rainbow_piks.jpg', '2024-07-18 13:16:12', '2024-07-18 13:16:12');

-- --------------------------------------------------------

--
-- Structure de la table `subcategories`
--

CREATE TABLE `subcategories` (
  `subcategory_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subcategories`
--

INSERT INTO `subcategories` (`subcategory_id`, `category_id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(8, 1, 'PC Portable', 'Gaming laptops', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/8.jpg', '2024-07-15 09:48:57', '2024-07-17 21:07:27'),
(9, 1, 'PC Fixe', 'Gaming desktops', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/9.jpg', '2024-07-15 09:48:57', '2024-07-17 21:07:20'),
(10, 1, 'Périphérique', 'Gaming peripherals', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/10.jpg', '2024-07-15 09:48:57', '2024-07-17 21:07:14'),
(11, 2, 'Boisson', 'Beverages', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/11.jpg', '2024-07-15 09:48:57', '2024-07-17 21:07:09'),
(12, 2, 'Charcuterie', 'Cured meats', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/12.jpg', '2024-07-15 09:48:57', '2024-07-17 21:07:03'),
(13, 2, 'Chips', 'Snack chips', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/13.jpg', '2024-07-15 09:48:57', '2024-07-17 21:06:58'),
(14, 2, 'Bonbon', 'Candies', 'https://res.cloudinary.com/djtvjwxrj/image/upload/v1721210761/Gaming_avenue_images/subcategories/14.jpg', '2024-07-15 09:48:57', '2024-07-17 21:06:49');

-- --------------------------------------------------------

--
-- Structure de la table `userprofiles`
--

CREATE TABLE `userprofiles` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userprofiles`
--

INSERT INTO `userprofiles` (`profile_id`, `user_id`, `first_name`, `last_name`, `address`, `phone_number`, `created_at`, `updated_at`) VALUES
(5, 5, 'test', 'test', NULL, '0783475206', '2024-07-16 17:37:55', '2024-07-16 17:37:55'),
(6, 6, 'adminadmin', 'adminadmin', NULL, '0000000000', '2024-07-16 17:40:56', '2024-07-16 17:40:56'),
(8, 8, 'bonjour', 'bonjour', NULL, '1234567890', '2024-07-17 13:16:01', '2024-07-17 13:16:01'),
(11, 11, 'Baptiste', 'RINGLER', NULL, '0783475206', '2024-07-18 08:46:21', '2024-07-18 08:46:21'),
(12, 12, 'cypress', 'cypress', NULL, '0606060606', '2024-07-18 15:57:20', '2024-07-18 15:57:20'),
(13, 13, 'Damien', 'Raunier', NULL, '0606060606', '2024-07-18 20:24:05', '2024-07-19 07:25:41'),
(14, 14, 'Romain', 'Cascio', NULL, '0606060606', '2024-07-19 07:36:11', '2024-07-19 07:36:11');

-- --------------------------------------------------------

--
-- Structure de la table `userroles`
--

CREATE TABLE `userroles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userroles`
--

INSERT INTO `userroles` (`role_id`, `role_name`) VALUES
(2, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `userrolesmapping`
--

CREATE TABLE `userrolesmapping` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userrolesmapping`
--

INSERT INTO `userrolesmapping` (`user_role_id`, `user_id`, `role_id`) VALUES
(1, 5, 1),
(2, 6, 2),
(4, 8, 1),
(7, 11, 1),
(8, 12, 1),
(9, 13, 1),
(10, 14, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(5, 'test12', 'test12@test.fr', '$2b$10$IcxXB7r/UBnadbDlYBnTK.nnhcRlNvRkwk.LYwdEAmOeAct8l.iUW', '2024-07-16 17:37:55', '2024-07-16 17:37:55'),
(6, 'admin', 'admin@gmail.com', '$2b$10$ycLwFmSdAyR0XSLeydrWVOcgA1cbJqE5QOIe.L43CREMGQU0MI8ca', '2024-07-16 17:40:56', '2024-07-16 17:40:56'),
(8, 'bonjour', 'bonjour@bonjour.fr', '$2b$10$igj4BdJ8NRphUad1UGuqtOEFCeWnB3PUL/zIWs1G9SVKhXvodB3Pi', '2024-07-17 13:16:01', '2024-07-17 13:16:01'),
(11, 'baptiste', 'ringlerbaptiste@gmail.com', '$2b$10$hvsdqbp08NlMkuin2cL.wey9a58OJL3R1OJ9lmW78cCHrxkutBt6S', '2024-07-18 08:46:21', '2024-07-18 08:46:21'),
(12, 'Cypress', 'cypress@gmail.com', '$2b$10$kzU.4qOgGzZ6lHusAHSvJefLoluKtkcDMmiC.G7CsgAW9x/yovKdm', '2024-07-18 15:57:20', '2024-07-18 15:57:20'),
(13, 'Damien', 'damienraunier@gmail.com', '$2b$10$aUxjyb0OIOVi7pgvZWUdbutuOCht6MbnG/pdh9DOO8JUjosuHCzum', '2024-07-18 20:24:05', '2024-07-19 07:25:41'),
(14, 'Romain', 'romain.cascio.pro@gmail.com', '$2b$10$yTw3XE2GiSiOljZ02wfhTO8c/De7oE5QkVp3C6XXtndv1vYWOCwHq', '2024-07-19 07:36:10', '2024-07-19 07:36:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Index pour la table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payments_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Index pour la table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `userprofiles`
--
ALTER TABLE `userprofiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Index pour la table `userrolesmapping`
--
ALTER TABLE `userrolesmapping`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `payments_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `userprofiles`
--
ALTER TABLE `userprofiles`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `userrolesmapping`
--
ALTER TABLE `userrolesmapping`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`);

--
-- Contraintes pour la table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Contraintes pour la table `userprofiles`
--
ALTER TABLE `userprofiles`
  ADD CONSTRAINT `userprofiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `userrolesmapping`
--
ALTER TABLE `userrolesmapping`
  ADD CONSTRAINT `userrolesmapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userrolesmapping_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `userroles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
