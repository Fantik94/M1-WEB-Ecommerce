-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 juil. 2024 à 15:55
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Gaming', 'Everything related to gaming', '2024-07-15 09:47:39', '2024-07-15 09:47:39'),
(2, 'Alimentation', 'Food and beverages', '2024-07-15 09:47:39', '2024-07-15 09:47:39');

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

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`product_id`, `subcategory_id`, `name`, `description`, `price`, `stock`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 8, 'ASUS ROG Strix G18', 'Jouez en toute confiance grâce à Windows 11 Pro et à la puissance brute du Strix G18 2024. Alimenté par un processeur Intel® Core™ i9 14900HX et jusqu\'à un GPU pour ordinateur portable NVIDIA GeForce RTX 4080 affichant un TGP maximal de 175 W avec Dynamic Boost, préparez-vous à dominer vos concurrents dans tous les jeux les plus récents. Accompagné d\'un Switch MUX dédié et de NVIDIA Advanced Optimus, le G18 libère le véritable potentiel de son matériel. Grâce au stockage SSD PCIe Gen4x4 et jusqu\'à 32Go de RAM DDR5 à 5600 MHz, les immenses bibliothèques de jeux et les sessions intenses de multitâche n\'effraient pas cette machine gaming.', 2999.99, 20, NULL, '2024-07-15 11:49:49', '2024-07-15 12:43:59'),
(2, 8, 'MSI Katana 15', 'Les GPU NVIDIA® GeForce RTX™ série 40 offrent une rapidité extrême aux gamers et aux créateurs. Basés sur l\'architecture NVIDIA Ada Lovelace à haut degré d’efficacité, ces GPU constituent une avancée décisive en matière de performances grâce au DLSS 3 basé sur l\'IA et au ray tracing qui assure des images ultraréalistes. De plus, la suite de technologies Max-Q optimise les performances du système, l\'alimentation, l\'autonomie de la batterie et le niveau de bruit, pour une efficacité plus élevée.', 1499.99, 15, NULL, '2024-07-15 12:00:19', '2024-07-15 12:16:36'),
(3, 8, 'OMEN TRANSCEND 14', 'Transcende ton gameplay avec la nouvelle architecture GPU NVIDIA Ada Lovelace, le DLSS 3.5 et le Ray Tracing amélioré par l’IA. Repousse les limites des applications de création grâce à RTX et aux outils NVIDIA Studio accélérés par l’IA, dédiés aux créateurs', 2499.99, 10, NULL, '2024-07-15 12:04:11', '2024-07-15 12:13:38'),
(4, 9, 'ASUS ROG STRIX GT15', 'Conçu tout particulièrement pour les gamers adeptes de LAN party, le PC Gamer ASUS ROG STRIX GT15 allie puissance, praticité et élégance au service du divertissement numérique. Facile à transporter, grâce à sa poignée intégrée, ce PC Gamer ASUS offre aussi l\'avantage d\'une mise à niveau simplifiée. Avec un processeur Intel Core i5-12400F, 16 Go de mémoire DDR4, un SSD M.2 PCIe de 512 Go une carte graphique NVIDIA GeForce RTX 3060 Ti, ce PC Gamer ASUS ROG STRIX GT15 G15CF vous offre la puissance et la vitesse dont vous avez besoin pour jouer dans d\'excellentes conditions.', 1799.99, 10, NULL, '2024-07-15 12:13:23', '2024-07-15 12:13:34'),
(5, 9, 'MSI MAG Infinite S3', 'Le PC Gamer MSI MAG Infinite S3 14NUC5 est taillé pour le gaming non-stop. Grâce à ses composants ultra-performants et ses fonctionnalités avancées, il offre de hautes performances et une excellente qualité audio/vidéo, pour une expérience de jeu vraiment confortable. Le MSI MAG Infinite S3 14NUC5-1437EU offre de hautes performances grâce à son processeur Intel Core i5-14400F, ses 16 Go de mémoire et sa carte graphique MSI GeForce RTX 4060. De plus, avec son SSD M.2 PCIe de 1 To, vous profitez à la fois d\'un fonctionnement ultra-rapide et d\'une grande capacité de stockage.', 1099.99, 5, NULL, '2024-07-15 12:43:24', '2024-07-15 12:43:51'),
(6, 10, 'ASUS 27\" LED - VG27AQ', 'Performances, immersion et émotions. Le moniteur ASUS TUF Gaming VG27AQ est prêt à vous faire passer au niveau supérieur du gaming et a, dans cette optique, été doté d\'un formidable arsenal technologique. Profitez d\'une dalle IPS de 27\" en résolution WQHD (2560 x 1440) pour redécouvrir vos jeux favoris et frayez-vous un chemin vers la victoire à l\'aide d\'un taux de rafraîchissement poussé à 165 Hz, épaulé par 1 ms de temps de réponse ! Ce moniteur dispose également d\'une arme secrète, l\'ELMB-Sync, qui permet d\'activer à la fois la technologie G-Sync (avec laquelle il est compatible) et la technologie ULMB (Ultra Low Motion Blur). De cette manière, vous n\'aurez plus à choisir entre fluidité parfaite sans déchirements ou la diminution du ghosting lors des phases d\'action rapides.', 259.00, 20, NULL, '2024-07-15 12:48:48', '2024-07-15 12:49:28'),
(7, 10, 'BenQ 27\" LED - MOBIUZ EX2710Q', 'Prenez part à une expérience gaming immersive avec l\'écran QHD BenQ Mobiuz EX2710Q ! Ce modèle à dalle IPS de 27 pouces propose un environnement de jeu optimal avec une grande fluidité, une qualité visuelle supérieure et un rendu des couleurs et des contrastes saisissants. Lancez votre jeu préféré et profitez de conditions rêvées pour tenter de décrocher la victoire !', 389.00, 15, NULL, '2024-07-15 12:52:00', '2024-07-15 12:52:07'),
(8, 10, 'iiyama 27\" LED - G-Master GB2770QSU-B5', 'Préparez-vous pour la bataille à venir avec un équipement paré pour la victoire. Le moniteur iiyama GB2770QSU-B5 combine avec efficacité une qualité d\'image supérieure avec des performances gaming élevées (temps de réponse de 0.5 ms, fréquence de 165 Hz, FreeSync Premium Pro). Profitez d\'un divertissement agréable et confortable avec une dalle Fast IPS, une résolution QHD et une conception ergonomique.', 259.00, 25, NULL, '2024-07-15 12:55:58', '2024-07-15 12:56:29'),
(9, 10, 'Acer 27\" LED - CB272Usmiiprx', 'Doté d\'un design moderne sans bords sur 3 côtés, le moniteur Acer CB272Usmiiprx est un outil polyvalent capable de vous accompagner aussi bien pour de la bureautique que pour de la retouche photo ou même des jeux vidéo. Sa dalle IPS de 27 pouces en résolution WQHD (2560 x 1440 pixels) offre des couleurs vives et profondes pour une immersion maximale. Les 1 ms de temps de réponse associés à la technologie FreeSync et au taux de rafraîchissement rapide de 75 Hz peuvent également transformer ce moniteur en une plateforme de jeu d\'une redoutable efficacité durant vos moments de détente.', 199.00, 30, NULL, '2024-07-15 13:18:56', '2024-07-15 13:19:07'),
(10, 10, 'Logitech G G515 TKL Lightspeed', 'Foncez vers la victoire avec le clavier Logitech G G515 TKL Lightspeed. Au format TKL, ce clavier gaming est équipé des switches mécaniques linéaires avancés GL Red pour une sensation plus douce, un déclenchement rapide et une frappe précise. Quant à la technologie LightSync RGB, chaque touche du clavier peut être personnalisée avec 16,8 millions de couleurs.', 149.00, 50, NULL, '2024-07-15 13:21:04', '2024-07-15 13:21:12'),
(11, 10, 'Logitech G G915 Tenkeyless Lightspeed Carbone', 'Rigoureusement conçu à partir de matériaux premium, le clavier Logitech G915 TKL Lightspeed est doté d\'un design sophistiqué, d\'une robustesse à toute épreuve et de performances sans précédent. Équipé de la technologie sans fil Lightspeed, vous bénéficiez d\'une réactivité extrêmement rapide d\'une milliseconde pour prendre plus facilement le dessus sur vos adversaires. Ce n\'est pas tout, il embarque de nouveaux switchs mécaniques ultra-plats hautes performances ainsi que la technologie RVB Lightsync pour vous permettre d\'entrer dans une toute nouvelle dimension.', 239.00, 40, NULL, '2024-07-15 13:24:11', '2024-07-15 13:24:29'),
(12, 10, 'ASUS ROG Harpe Ace Moonlight', 'Prenez le dessus sur vos adversaires avec une facilité déconcertante grâce à la souris sans fil ASUS ROG Harpe Ace. Grâce à son capteur optique ROG AimPoint de 36 000 dpi, elle offre une précision chirurgicale. Son design ergonomique vous apporte confort et facilité d\'utilisation lorsque vous jouez pendant de longues heures. Conçue pour les champions d\'eSports et les joueurs professionnels en puissance, cette souris ultralégère de 54 grammes comprend la fonction Aim Lab Settings Optimizer qui mesure et analyse les performances du joueur pour créer la meilleure combinaison de paramètres possible, en fonction de vos points forts.', 159.00, 30, NULL, '2024-07-15 13:27:12', '2024-07-15 13:27:29'),
(13, 10, 'Corsair Dark Core RGB Pro SE', 'Proposant une connexion filaire (USB) et non filaire (Bluetooth/RF), la souris Dark Core RGB Pro SE de Corsair vous donne un avantage certain sur tous vos adversaires. Équipée d\'un capteur optique de 18 000 dpi, elle offre des performances de gaming exceptionnelles. Cette souris allie précision et contrôle, et est de plus rechargeable via la technologie sans fil Qi.', 119.00, 30, NULL, '2024-07-15 13:43:13', '2024-07-15 13:43:25'),
(14, 10, 'Logitech G Pro X Gaming Headset', 'Conçu en collaboration avec de nombreux joueurs professionnels sur divers genres de jeux, le Logitech G Pro X Gaming Headset va vous permettre d\'entendre les sons de votre jeu avec précision. Avec des transducteurs Pro-G de 50 mm en similicuir isolants, un son surround DTS Headphone:X 2.0, un microphone de qualité professionnelle disposant de la technologie Blue Vo!ce et une construction légère, le Logitech G Pro X Gaming Headset est l\'accessoire idéal pour les tournois intenses.', 119.00, 25, NULL, '2024-07-15 13:51:42', '2024-07-15 13:54:50'),
(15, 10, 'Corsair HS65', 'Le micro-casque Corsair HS65 offre confort, légèreté et durabilité afin de vous garantir des heures de gameplay dans les meilleures conditions. Retrouvez un son surround Dolby Vision 7.1 pour une expérience audio multicanale, mais également un microphone omnidirectionnel ou encore une compatibilité multiplateforme.', 89.00, 30, NULL, '2024-07-15 13:54:40', '2024-07-15 13:54:53');

-- --------------------------------------------------------

--
-- Structure de la table `subcategories`
--

CREATE TABLE `subcategories` (
  `subcategory_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subcategories`
--

INSERT INTO `subcategories` (`subcategory_id`, `category_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(8, 1, 'PC Portable', 'Gaming laptops', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(9, 1, 'PC Fixe', 'Gaming desktops', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(10, 1, 'Périphérique', 'Gaming peripherals', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(11, 2, 'Boisson', 'Beverages', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(12, 2, 'Charcuterie', 'Cured meats', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(13, 2, 'Chips', 'Snack chips', '2024-07-15 09:48:57', '2024-07-15 09:48:57'),
(14, 2, 'Bonbon', 'Candies', '2024-07-15 09:48:57', '2024-07-15 09:48:57');

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

-- --------------------------------------------------------

--
-- Structure de la table `userroles`
--

CREATE TABLE `userroles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `userrolesmapping`
--

CREATE TABLE `userrolesmapping` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

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
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `userprofiles`
--
ALTER TABLE `userprofiles`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `userrolesmapping`
--
ALTER TABLE `userrolesmapping`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

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
