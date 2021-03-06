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
  `parent_id` int(30) NULL,
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
  `category_id` int(11) NOT NULL,
  `category_type_id` int(11) NOT NULL,
  `description` varchar(700) NULL,
  `additional` varchar(700) NULL,
  `information` varchar(700) NULL,
  `amount` int(7) NULL,
  `price` int(6) NULL,
  `currency` enum('SYP', 'USD', 'EUR') DEFAULT 'SYP',
  `main_image` varchar(300) NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_product_admin_user` (`admin_id`),
  CONSTRAINT `FK_product_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`),
  KEY `FK_product_category_id` (`category_id`),
  CONSTRAINT `FK_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  KEY `FK_product_category_type_id` (`category_type_id`),
  CONSTRAINT `FK_product_category_type_id` FOREIGN KEY (`category_type_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 01/08/2019*/
CREATE TABLE `product_size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `size_details` varchar(700) NULL,
  `amount` int(7) NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_size_index` (`product_id`, `size_id`),
  KEY `FK_product_size_product` (`product_id`),
  CONSTRAINT `FK_product_size_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  KEY `FK_product_size_size` (`size_id`),
  CONSTRAINT `FK_product_size_size` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 03/08/2019*/
CREATE TABLE `product_color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `amount` int(7) NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_color_index` (`product_id`, `color_id`),
  KEY `FK_product_color_product` (`product_id`),
  CONSTRAINT `FK_product_color_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  KEY `FK_product_color_color` (`color_id`),
  CONSTRAINT `FK_product_color_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `product_color_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_color_id` int(11) NULL,
  `product_id` int(11) NULL,
  `image_path` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_path` (`image_path`),
  UNIQUE KEY `product_color_index` (`product_color_id`, `image_path`),
  KEY `FK_product_color_image_product_color` (`product_color_id`),
  CONSTRAINT `FK_product_color_image_product_color` FOREIGN KEY (`product_color_id`) REFERENCES `product_color` (`id`),
  KEY `FK_product_color_image_product` (`product_id`),
  CONSTRAINT `FK_product_color_image_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 31/08/2019*/
ALTER TABLE `product_size` 
ADD COLUMN `height` VARCHAR(50) NULL,
ADD COLUMN `chest` VARCHAR(50)  NULL,
ADD COLUMN `waistline` VARCHAR(50)  NULL;
/*END*/

/*Added 07/09/2019*/
ALTER TABLE `product` 
CHANGE `additional` `details` VARCHAR(700),
DROP `information`;

CREATE TABLE `user_demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(30) NOT NULL,
  `name` varchar(100) NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(800) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_demand_product` (`product_id`),
  CONSTRAINT `FK_user_demand_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 22/09/2019*/
ALTER TABLE `user_demand`
ADD COLUMN `phone` VARCHAR(100) NULL,
ADD COLUMN `subject` VARCHAR(200)  NULL,
MODIFY `product_id` int(30) null;
/*END*/

/*Added 26/09/2019*/
CREATE TABLE `subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 28/09/2019*/
ALTER TABLE `product` 
ADD COLUMN `category_tag_id` int(11) NULL,
ADD KEY `FK_product_category_tag_id` (`category_tag_id`),
ADD CONSTRAINT `FK_product_category_tag_id` FOREIGN KEY (`category_tag_id`) REFERENCES `category` (`id`);
/*END*/

/*Added 29/09/2019*/
ALTER TABLE `product_size`
ADD COLUMN `hips` VARCHAR(50) NULL;

ALTER TABLE `product`
ADD COLUMN `stock_status` TINYINT(1) NOT NULL DEFAULT 1;

ALTER TABLE `product_color` 
ADD COLUMN `product_color_code` VARCHAR(50) NULL,
ADD UNIQUE KEY `product_color_code` (`product_color_code`);

ALTER TABLE `product_price` 
ADD COLUMN `size_price` INT(6) NULL;
/*END*/

/*Added 13/10/2019*/
ALTER TABLE `product`
ADD COLUMN `is_best` TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE `product_color` DROP INDEX `product_color_code`;

CREATE TABLE `email_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 0,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*END*/

/*Added 20/10/2019*/
ALTER TABLE `product` 
ADD COLUMN `sort_index` INT(11) NULL,
ADD UNIQUE KEY `sort_index` (`sort_index`);
/*END*/


/*Added 27/10/2019*/
ALTER TABLE `product`
ADD COLUMN `is_handmade` TINYINT(1) NOT NULL DEFAULT 0;
/*END*/

/*Added 07/12/2019*/
ALTER TABLE `product` MODIFY `sort_index` DOUBLE;
/*END*/

/*Added 22/03/2020*/
ALTER TABLE `product_size`
CHANGE waistline waist VARCHAR(50) NULL,
ADD COLUMN `neck` VARCHAR(50) NULL,
ADD COLUMN `shoulders` VARCHAR(50) NULL,
ADD COLUMN `sleeves` VARCHAR(50) NULL,
ADD COLUMN `length` VARCHAR(50) NULL,
ADD COLUMN `total_height` VARCHAR(50) NULL,
ADD COLUMN `head_circumference` VARCHAR(50) NULL,
ADD COLUMN `foot_length` VARCHAR(50) NULL;

ALTER TABLE `product` MODIFY `sort_index` VARCHAR(20);
/*END*/