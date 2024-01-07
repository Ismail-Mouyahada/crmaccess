-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour cotation_master_db
CREATE DATABASE IF NOT EXISTS `cotation_master_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cotation_master_db`;

-- Listage de la structure de table cotation_master_db. compteurs_elec
CREATE TABLE IF NOT EXISTS `compteurs_elec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pdl` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `segment` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `taux_cspe` float DEFAULT NULL,
  `base_consommation` float DEFAULT NULL,
  `hp_conso` float DEFAULT NULL,
  `hc_conso` float DEFAULT NULL,
  `pte_conso` float DEFAULT NULL,
  `hch_conso` float DEFAULT NULL,
  `hpe_conso` float DEFAULT NULL,
  `hp_puiss` float DEFAULT NULL,
  `hc_puiss` float DEFAULT NULL,
  `pte_puiss` float DEFAULT NULL,
  `hph_puiss` float DEFAULT NULL,
  `hpe_puiss` float DEFAULT NULL,
  `date_cloture` date DEFAULT NULL,
  `date_remise_offre` date DEFAULT NULL,
  `date_debut_fourniture` date DEFAULT NULL,
  `date_fin_fourniture` date DEFAULT NULL,
  `reseau_distribution` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `courtage` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `efficacite` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fiscalite` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `societe_id` int DEFAULT NULL,
  `fournisseur` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FTA` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Listage des données de la table cotation_master_db.compteurs_elec : ~0 rows (environ)

-- Listage de la structure de table cotation_master_db. compteurs_gaz
CREATE TABLE IF NOT EXISTS `compteurs_gaz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PCE` varchar(16) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profil` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `car` float DEFAULT NULL,
  `tarif_distribution` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `eligible_cee` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_cloture` date DEFAULT NULL,
  `date_remise_offre` date DEFAULT NULL,
  `date_debut_fourniture` date DEFAULT NULL,
  `date_fin_fourniture` date DEFAULT NULL,
  `efficacite` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fiscalite` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `courtage` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `societe_id` int DEFAULT NULL,
  `fournisseur` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.compteurs_gaz : ~0 rows (environ)
INSERT INTO `compteurs_gaz` (`id`, `PCE`, `profil`, `car`, `tarif_distribution`, `eligible_cee`, `date_cloture`, `date_remise_offre`, `date_debut_fourniture`, `date_fin_fourniture`, `efficacite`, `fiscalite`, `courtage`, `societe_id`, `fournisseur`) VALUES
	(2, '85727', '27852', 72257, '572752', 'true', '2024-01-05', '2024-01-05', '2024-01-05', '2024-01-05', '0', '0', '0', 4, 'engie');

-- Listage de la structure de table cotation_master_db. evenements
CREATE TABLE IF NOT EXISTS `evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_evenement` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sujet` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `statut` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_rendez_vous` datetime DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `details` text COLLATE utf8mb4_general_ci,
  `societe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.evenements : ~0 rows (environ)
INSERT INTO `evenements` (`id`, `type_evenement`, `sujet`, `statut`, `date_rendez_vous`, `date_creation`, `details`, `societe_id`) VALUES
	(1, 'fdgfg', 'dfgdfg', 'true', '2024-01-05 14:42:21', '2024-01-05 15:42:28', '<p>fdgfdgfg</p>', NULL);

-- Listage de la structure de table cotation_master_db. fournisseurs
CREATE TABLE IF NOT EXISTS `fournisseurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nom_fournisseurs` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gaz` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `electrcite` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verte` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `disponible` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.fournisseurs : ~0 rows (environ)
INSERT INTO `fournisseurs` (`id`, `logo`, `nom_fournisseurs`, `gaz`, `electrcite`, `verte`, `disponible`) VALUES
	(1, 'uploads/files/4a3fca7e83fa3ce38bb9ca03009bde18.jpg', 'Engie', 'true', 'true', 'true', 'true');

-- Listage de la structure de table cotation_master_db. messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sujet` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `details` text COLLATE utf8mb4_general_ci,
  `societe` int DEFAULT NULL,
  `statut` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.messages : ~0 rows (environ)

-- Listage de la structure de table cotation_master_db. societes
CREATE TABLE IF NOT EXISTS `societes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `siren` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `logo` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nom_entreprise` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code_postal` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `region` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `utilisateur_id` int DEFAULT NULL,
  `note_elirpo` float DEFAULT NULL,
  `note_creditsafe` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.societes : ~2 rows (environ)
INSERT INTO `societes` (`id`, `siren`, `logo`, `nom_entreprise`, `ville`, `code_postal`, `region`, `adresse`, `utilisateur_id`, `note_elirpo`, `note_creditsafe`) VALUES
	(4, '048535747', 'uploads/files/79d0635a68f813509723b407d6aee435.png', 'Access ENERGIES', 'Rouen', '78400', 'Seine-Martime', '13 rue Marius Vallée', 1, 55, 55);

-- Listage de la structure de table cotation_master_db. type_evenements
CREATE TABLE IF NOT EXISTS `type_evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_evenement` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.type_evenements : ~0 rows (environ)

-- Listage de la structure de table cotation_master_db. utilisateurs
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nom` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `agence` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profile` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `statut` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telephone` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `telephone` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table cotation_master_db.utilisateurs : ~2 rows (environ)
INSERT INTO `utilisateurs` (`id`, `nom_utilisateur`, `nom`, `prenom`, `agence`, `profile`, `adresse`, `statut`, `telephone`, `mot_de_passe`, `email`) VALUES
	(1, 'Ismail', NULL, NULL, NULL, 'uploads/files/e8cb0e18b7bdfa452a61b86b5da8cd23.gif', NULL, NULL, 'i.mouyahada@accessenergies.fr', '$2a$10$Z3bcFmWiSPB99WLqa/o5eO9UT3DZTyZTLqgkd9Yb/evxBKy9sg6iu', 'ismail.mouyahada@gmail.com'),
	(2, 'Ismails', NULL, NULL, NULL, 'uploads/files/56788bbb074621ae277aac54ff53c2d7.png', NULL, NULL, '0784075061', '$2a$10$n.hVqqpyt5Zdmmki8sRsX.SteTXxLePGwKC0Aq1RmwVTgt1NJ.hZa', 'hello@gmail.com'),
	(4, '@Ismail', NULL, NULL, NULL, '', NULL, NULL, '0784075062', '$2a$10$V2ZR1H1sZSq5y0.NLanfkupcr4JFn3oykeeMgWh62Hy.j2NjpbCpu', 'isma@gmail.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
