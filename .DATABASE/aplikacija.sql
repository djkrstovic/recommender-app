/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `aplikacija`;
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC'),
	(2, 'test', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF'),
	(3, 'test2', '6D201BEEEFB589B08EF0672DAC82353D0CBD9AD99E1642C83A1601F3D647BCCA003257B5E8F31BDC1D73FBEC84FB085C79D6E2677B7FF927E823A54E789140D9'),
	(4, 'test3', 'CB872DE2B8D2509C54344435CE9CB43B4FAA27F97D486FF4DE35AF03E4919FB4EC53267CAF8DEF06EF177D69FE0ABAB3C12FBDC2F267D895FD07C36A62BFF4BF'),
	(6, 'admin-test', 'AE4325DCF395FECEE770DA6FB455CC8331D8D3C244E9C4EBB76FA46D5D88EF7A3E917E6BAFC08ED33CA587B74C37F0AFFB1028CD5720883DE212E488AC6A1B45'),
	(7, 'admin-test1', '36D18C261838546C42AA81701A08AC846961ABAC508E2E7105E4ADF34AD5045BEE74C7EC385780AB6F85BBB454275C047C67ED589B6EA30C934F500752849E93'),
	(8, 'admin-test2', '87025FCCA34F45470DB6284B7E101B86EDDD736A584AB6BBD19AC36D91CB50670CA07A74AFBDD21776659B03122AA80D6421BF9110D6E5B933A01A7F5C236BFC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`) VALUES
	(1, 'Movie'),
	(2, 'TV Series');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

DROP TABLE IF EXISTS `episode`;
CREATE TABLE IF NOT EXISTS `episode` (
  `episode_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_srb` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title_eng` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `synopsis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `season` int unsigned NOT NULL,
  `season_episode` int unsigned NOT NULL,
  `tv_series_id` int unsigned NOT NULL,
  PRIMARY KEY (`episode_id`),
  KEY `fk_episode_tv_series_id` (`tv_series_id`) USING BTREE,
  CONSTRAINT `fk_episode_tv_series_id` FOREIGN KEY (`tv_series_id`) REFERENCES `tv_series` (`tv_series_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `episode`;
/*!40000 ALTER TABLE `episode` DISABLE KEYS */;
INSERT INTO `episode` (`episode_id`, `title_srb`, `title_eng`, `synopsis`, `season`, `season_episode`, `tv_series_id`) VALUES
	(6, 'Dolazi zima', 'Winter Is Coming', 'Eddard Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon; Viserys plans to wed his sister to a nomadic warlord in exchange for an army.', 1, 1, 1),
	(7, 'Kraljev put', 'The Kingsroad', 'While Bran recovers from his fall, Ned takes only his daughters to King\'s Landing. Jon Snow goes with his uncle Benjen to the Wall. Tyrion joins them.', 1, 2, 1),
	(15, 'Vojvoda Snow', 'Lord Snow', 'Jon begins his training with the Night\'s Watch; Ned confronts his past and future at King\'s Landing; Daenerys finds herself at odds with Viserys.', 1, 3, 1),
	(16, 'Epizoda', 'Episode', 'Sinopsis123', 1, 4, 2);
/*!40000 ALTER TABLE `episode` ENABLE KEYS */;

DROP TABLE IF EXISTS `genre`;
CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `genre`;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` (`genre_id`, `name`) VALUES
	(1, 'Drama '),
	(2, 'Action'),
	(3, 'Thriller'),
	(4, 'Crime'),
	(5, 'Comedy'),
	(6, 'Adventure'),
	(7, 'Horror'),
	(8, 'Romance'),
	(9, 'Mystery'),
	(10, 'Sci-Fi'),
	(11, 'Documentary'),
	(12, 'Western'),
	(13, 'Fantasy');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;

DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_srb` varchar(64) DEFAULT NULL,
  `title_eng` varchar(64) DEFAULT NULL,
  `director` varchar(64) DEFAULT NULL,
  `synopsis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `category_id` int unsigned NOT NULL,
  `genre_id` int unsigned NOT NULL,
  PRIMARY KEY (`movie_id`) USING BTREE,
  KEY `fk_movie_category_id` (`category_id`) USING BTREE,
  KEY `fk_movie_genre_id` (`genre_id`) USING BTREE,
  CONSTRAINT `fk_movie_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `movie`;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`movie_id`, `title_srb`, `title_eng`, `director`, `synopsis`, `category_id`, `genre_id`) VALUES
	(1, 'Zima', 'Winter', 'Sergey Chernikov', 'On a gas station, Alexander and his father are attacked. The father dies, and Alexander becomes a dangerous witness. He is forced to start the persecution himself and very soon turns from a victim into a cold-blooded hunter.', 1, 1),
	(2, 'Zlocesti djed1', 'Dirty Grandpa', 'Dan Mazerc', 'Right before his wedding, an uptight guy is tricked into driving his grandfather, a lecherous former Army Lieutenant Colonel, to Florida for Spring Break.', 1, 5),
	(3, 'Mi smo tvoji prijatelji', 'We Are Your Friends', 'Max Joseph', 'Caught between a forbidden romance and the expectations of his friends, aspiring DJ Cole Carter attempts to find the path in life that leads to fame and fortune.', 1, 8),
	(4, 'Zvezda je rodjena', 'A Star Is Born', 'Bradley Cooper', 'A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.', 1, 1),
	(5, 'Brda imaju oci', 'The Hills Have Eyes', 'Alexandre Aja', 'A family falls victim to a group of mutated cannibals in a desert far away from civilization.', 1, 7);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo_episode`;
CREATE TABLE IF NOT EXISTS `photo_episode` (
  `photo_episode_id` int unsigned NOT NULL AUTO_INCREMENT,
  `episode_id` int unsigned NOT NULL,
  `image_path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`photo_episode_id`),
  UNIQUE KEY `uq_photo_episode_image_path` (`image_path`),
  KEY `fk_photo_episode_episode` (`episode_id`),
  CONSTRAINT `fk_photo_episode_episode` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo_episode`;
/*!40000 ALTER TABLE `photo_episode` DISABLE KEYS */;
INSERT INTO `photo_episode` (`photo_episode_id`, `episode_id`, `image_path`) VALUES
	(3, 6, '2020626-4246719447-winter-is-coming-s1-e1.jpg'),
	(4, 7, '2020626-4456432022-the-kingsroad-s1-e2.jpg'),
	(5, 15, '2020626-4565788273-lord-snow-s1-e3.jpg');
/*!40000 ALTER TABLE `photo_episode` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo_movie`;
CREATE TABLE IF NOT EXISTS `photo_movie` (
  `photo_movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int unsigned NOT NULL,
  `image_path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`photo_movie_id`),
  UNIQUE KEY `uq_photo_movie_image_path` (`image_path`),
  KEY `fk_photo_movie_movie` (`movie_id`),
  CONSTRAINT `fk_photo_movie_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo_movie`;
/*!40000 ALTER TABLE `photo_movie` DISABLE KEYS */;
INSERT INTO `photo_movie` (`photo_movie_id`, `movie_id`, `image_path`) VALUES
	(6, 1, '2020626-3478431254-winter2020.jpg'),
	(7, 2, '2020626-8379741137-dirty-grandpa.jpg');
/*!40000 ALTER TABLE `photo_movie` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo_tv_series`;
CREATE TABLE IF NOT EXISTS `photo_tv_series` (
  `photo_tv_series_id` int unsigned NOT NULL AUTO_INCREMENT,
  `tv_series_id` int unsigned NOT NULL,
  `image_path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`photo_tv_series_id`),
  UNIQUE KEY `uq_photo_tv_series_image_path` (`image_path`),
  KEY `fk_photo_tv_series_tv_series` (`tv_series_id`),
  CONSTRAINT `fk_photo_tv_series_tv_series` FOREIGN KEY (`tv_series_id`) REFERENCES `tv_series` (`tv_series_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo_tv_series`;
/*!40000 ALTER TABLE `photo_tv_series` DISABLE KEYS */;
INSERT INTO `photo_tv_series` (`photo_tv_series_id`, `tv_series_id`, `image_path`) VALUES
	(6, 1, '2020626-8388275036-winter-is-coming-s1-e1.jpg'),
	(7, 2, '2020626-2271439057-black-mirror.jpg');
/*!40000 ALTER TABLE `photo_tv_series` ENABLE KEYS */;

DROP TABLE IF EXISTS `rating_user_episode`;
CREATE TABLE IF NOT EXISTS `rating_user_episode` (
  `rating_user_episode_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `episode_id` int unsigned NOT NULL,
  `rating` enum('1','2','3','4','5','6','7','8','9','10') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`rating_user_episode_id`),
  KEY `fk_rating_user_episode_episode_id` (`episode_id`),
  KEY `fk_rating_user_episode_user_id` (`user_id`),
  CONSTRAINT `fk_rating_user_episode_episode_id` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_user_episode_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `rating_user_episode`;
/*!40000 ALTER TABLE `rating_user_episode` DISABLE KEYS */;
INSERT INTO `rating_user_episode` (`rating_user_episode_id`, `user_id`, `episode_id`, `rating`) VALUES
	(1, 1, 6, '9'),
	(2, 2, 6, '5'),
	(3, 3, 6, '3'),
	(4, 5, 6, '10'),
	(5, 1, 7, '6'),
	(6, 2, 7, '3');
/*!40000 ALTER TABLE `rating_user_episode` ENABLE KEYS */;

DROP TABLE IF EXISTS `rating_user_movie`;
CREATE TABLE IF NOT EXISTS `rating_user_movie` (
  `rating_user_movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  `rating` enum('1','2','3','4','5','6','7','8','9','10') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`rating_user_movie_id`),
  KEY `fk_rating_user_movie_movie_id` (`movie_id`),
  KEY `fk_rating_user_movie_user_id` (`user_id`),
  CONSTRAINT `fk_rating_user_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_user_movie_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `rating_user_movie`;
/*!40000 ALTER TABLE `rating_user_movie` DISABLE KEYS */;
INSERT INTO `rating_user_movie` (`rating_user_movie_id`, `user_id`, `movie_id`, `rating`) VALUES
	(1, 2, 2, '8'),
	(2, 1, 2, '10'),
	(3, 3, 2, '6'),
	(4, 1, 1, '5'),
	(5, 3, 1, '10'),
	(6, 1, 3, '10'),
	(7, 2, 3, '10'),
	(8, 5, 4, '7'),
	(9, 3, 5, '9'),
	(10, 2, 5, '6'),
	(11, 3, 3, '3');
/*!40000 ALTER TABLE `rating_user_movie` ENABLE KEYS */;

DROP TABLE IF EXISTS `status_user_episode`;
CREATE TABLE IF NOT EXISTS `status_user_episode` (
  `status_user_episode_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `episode_id` int unsigned NOT NULL,
  `status` enum('gledao','zeli da gleda','ne zeli da gleda') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`status_user_episode_id`),
  KEY `fk_status_user_episode_episode_id` (`episode_id`),
  KEY `fk_status_user_episode_user_id` (`user_id`),
  CONSTRAINT `fk_status_user_episode_episode_id` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_status_user_episode_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `status_user_episode`;
/*!40000 ALTER TABLE `status_user_episode` DISABLE KEYS */;
INSERT INTO `status_user_episode` (`status_user_episode_id`, `user_id`, `episode_id`, `status`) VALUES
	(1, 1, 6, 'gledao'),
	(2, 1, 7, 'gledao'),
	(3, 2, 6, 'gledao'),
	(4, 2, 7, 'gledao'),
	(5, 3, 6, 'gledao'),
	(6, 5, 6, 'gledao');
/*!40000 ALTER TABLE `status_user_episode` ENABLE KEYS */;

DROP TABLE IF EXISTS `status_user_movie`;
CREATE TABLE IF NOT EXISTS `status_user_movie` (
  `status_user_movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `movie_id` int unsigned NOT NULL,
  `status` enum('gledao','zeli da gleda','ne zeli da gleda') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`status_user_movie_id`) USING BTREE,
  KEY `fk_status_user_movie_movie_id` (`movie_id`),
  KEY `fk_status_user_movie_user_id` (`user_id`),
  CONSTRAINT `fk_status_user_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_status_user_movie_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `status_user_movie`;
/*!40000 ALTER TABLE `status_user_movie` DISABLE KEYS */;
INSERT INTO `status_user_movie` (`status_user_movie_id`, `user_id`, `movie_id`, `status`) VALUES
	(1, 2, 2, 'gledao'),
	(2, 1, 1, 'gledao'),
	(3, 1, 2, 'gledao'),
	(4, 3, 1, 'gledao'),
	(5, 3, 2, 'gledao'),
	(6, 1, 3, 'gledao'),
	(7, 2, 3, 'gledao'),
	(8, 5, 4, 'gledao'),
	(9, 2, 5, 'gledao'),
	(10, 3, 5, 'gledao');
/*!40000 ALTER TABLE `status_user_movie` ENABLE KEYS */;

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `uq_tag_tag_name` (`tag_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `tag`;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` (`tag_id`, `tag_name`) VALUES
	(2, 'Dark'),
	(3, 'Dramatic'),
	(1, 'Emotional'),
	(4, 'Fun'),
	(13, 'Happy'),
	(7, 'Mysterious'),
	(11, 'Novi tag'),
	(10, 'Police'),
	(8, 'Scary'),
	(9, 'Shocking'),
	(5, 'Teenagers'),
	(6, 'Touching');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

DROP TABLE IF EXISTS `tag_episode`;
CREATE TABLE IF NOT EXISTS `tag_episode` (
  `tag_episode_id` int unsigned NOT NULL AUTO_INCREMENT,
  `episode_id` int unsigned NOT NULL DEFAULT '0',
  `tag_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_episode_id`) USING BTREE,
  KEY `fk_tag_episode_tag_id` (`tag_id`),
  KEY `fk_tag_episode_episode_id` (`episode_id`) USING BTREE,
  CONSTRAINT `fk_tag_episode_episode_id` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tag_episode_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `tag_episode`;
/*!40000 ALTER TABLE `tag_episode` DISABLE KEYS */;
INSERT INTO `tag_episode` (`tag_episode_id`, `episode_id`, `tag_id`) VALUES
	(2, 6, 1),
	(3, 6, 3),
	(4, 7, 3),
	(26, 15, 7),
	(27, 15, 8),
	(28, 15, 9),
	(32, 16, 2),
	(33, 16, 4),
	(34, 16, 6);
/*!40000 ALTER TABLE `tag_episode` ENABLE KEYS */;

DROP TABLE IF EXISTS `tag_movie`;
CREATE TABLE IF NOT EXISTS `tag_movie` (
  `tag_movies_id` int unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  `tag_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_movies_id`),
  KEY `fk_tag_movie_tag_id` (`tag_id`) USING BTREE,
  KEY `fk_tag_movie_movie_id` (`movie_id`) USING BTREE,
  CONSTRAINT `fk_tag_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tag_movie_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `tag_movie`;
/*!40000 ALTER TABLE `tag_movie` DISABLE KEYS */;
INSERT INTO `tag_movie` (`tag_movies_id`, `movie_id`, `tag_id`) VALUES
	(2, 1, 3),
	(3, 1, 7),
	(10, 2, 1),
	(11, 2, 4),
	(12, 2, 5),
	(13, 3, 5),
	(14, 3, 1),
	(15, 5, 2),
	(16, 5, 8),
	(17, 5, 3),
	(18, 4, 5),
	(19, 4, 6);
/*!40000 ALTER TABLE `tag_movie` ENABLE KEYS */;

DROP TABLE IF EXISTS `tv_series`;
CREATE TABLE IF NOT EXISTS `tv_series` (
  `tv_series_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_srb` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title_eng` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `director` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `synopsis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `category_id` int unsigned NOT NULL,
  `genre_id` int unsigned NOT NULL,
  PRIMARY KEY (`tv_series_id`) USING BTREE,
  KEY `fk_tv_series_category_id` (`category_id`),
  KEY `fk_tv_series_genre_id` (`genre_id`),
  CONSTRAINT `fk_tv_series_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tv_series_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `tv_series`;
/*!40000 ALTER TABLE `tv_series` DISABLE KEYS */;
INSERT INTO `tv_series` (`tv_series_id`, `title_srb`, `title_eng`, `director`, `synopsis`, `category_id`, `genre_id`) VALUES
	(1, 'Igra prestola', 'Game of Thrones ', 'David Benioff', 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', 2, 2),
	(2, 'Crno ogledalo', 'Black Mirror', 'Charlie Brooker', 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', 2, 10);
/*!40000 ALTER TABLE `tv_series` ENABLE KEYS */;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `forename` varchar(64) NOT NULL DEFAULT '0',
  `surname` varchar(64) NOT NULL DEFAULT '0',
  `phone_number` varchar(24) NOT NULL DEFAULT '0',
  `postal_address` text NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `email`, `password_hash`, `forename`, `surname`, `phone_number`, `postal_address`) VALUES
	(1, 'pperic@user.com', 'pperic', 'Pera', 'Peric', '06112345678', 'Ulica BB, Beograd'),
	(2, 'mmilic@user.com', 'mmilic', 'Milica', 'MIlic', '06187654321', 'Ulica 88, Beograd'),
	(3, 'test@test.com', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF', 'Pera', 'Peric', '+38160999999', 'Ulica BB, Stari Grad, Beograd'),
	(5, 'test1@test.com', 'ED6216D6E1B6C216C9826069ABA18BBD4636603F940F3503DCF45B23ACA373DF77123ECCD86B104F10CEFA2FADCB8BC00264D4BFD6CB849AAA6A8CF0ABDBF3A2', 'Milan', 'Milanovic', '+381113304564', 'Ulica Nevinih Zrtava 5, Stari Grad, Beograd');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

DROP TABLE IF EXISTS `user_token`;
CREATE TABLE IF NOT EXISTS `user_token` (
  `user_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text COLLATE utf8_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_token_id`),
  KEY `fk_user_token_user_id` (`user_id`),
  CONSTRAINT `fk_user_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `user_token`;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
INSERT INTO `user_token` (`user_token_id`, `user_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 5, '2020-07-04 17:19:23', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjo1LCJpZGVudGl0eSI6InRlc3QxQHRlc3QuY29tIiwiZXhwIjoxNTk2NTU0MzYzLjAwOSwiaXAiOiI6OmZmZmY6MTI3LjAuMC4xIiwidWEiOiJQb3N0bWFuUnVudGltZS83LjI2LjEiLCJpYXQiOjE1OTM4NzU5NjN9.yH5RN230GlcFY3yVC-DgALBDv_52J5S2NgPtmhuGmq4', '2020-08-04 15:19:23', 1),
	(2, 5, '2020-07-04 20:31:45', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjo1LCJpZGVudGl0eSI6InRlc3QxQHRlc3QuY29tIiwiZXhwIjoxNTk2NTY1OTA1LjA5NCwiaXAiOiI6OjEiLCJ1YSI6IlBvc3RtYW5SdW50aW1lLzcuMjYuMSIsImlhdCI6MTU5Mzg4NzUwNX0.E73bWqC235H7skskClL9myv_qH13aCyd0eEcRbYDmtA', '2020-08-04 18:31:45', 1);
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
