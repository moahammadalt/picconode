/*Added 28/07/2019*/
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(30) NOT NULL,
  `name` varchar(50) NULL,
  `slug` varchar(50) NOT NULL,
  `parent_id` int(30) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_category_admin_user` (`admin_id`),
  CONSTRAINT `FK_category_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 30/07/2019*/
CREATE TABLE `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_size_admin_user` (`admin_id`),
  CONSTRAINT `FK_size_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `hex_code` varchar(50) NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_color_admin_user` (`admin_id`),
  CONSTRAINT `FK_color_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `category` varchar(50) NOT NULL,
  `category_type` varchar(50) NOT NULL,
  `description` varchar(700) NULL,
  `additional` varchar(700) NULL,
  `information` varchar(700) NULL,
  `amount` int(7) NULL,
  `price` int(6) NULL,
  `currency` enum('SYP', 'USD', 'EUR') DEFAULT 'SYP',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_product_admin_user` (`admin_id`),
  CONSTRAINT `FK_product_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`),
  KEY `FK_product_category` (`category`),
  CONSTRAINT `FK_product_category` FOREIGN KEY (`category`) REFERENCES `category` (`slug`),
  KEY `FK_product_category_type` (`category_type`),
  CONSTRAINT `FK_product_category_type` FOREIGN KEY (`category_type`) REFERENCES `category` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/