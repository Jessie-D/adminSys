/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost
 Source Database       : egg

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : utf-8

 Date: 04/09/2019 17:49:59 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `role_modules`
-- ----------------------------
DROP TABLE IF EXISTS `role_modules`;
CREATE TABLE `role_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `role_modules_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_modules_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `role_modules`
-- ----------------------------
BEGIN;
INSERT INTO `role_modules` VALUES ('1', '1', '1', '2019-04-04 14:55:05', '2019-04-04 14:55:07'), ('2', '1', '2', '2019-04-04 14:56:02', '2019-04-04 14:56:05'), ('3', '1', '3', null, null), ('4', '1', '4', null, null), ('6', '1', '5', null, null), ('7', '1', '6', null, null), ('8', '1', '9', null, null), ('9', '1', '10', null, null), ('10', '1', '7', null, null), ('11', '1', '8', null, null), ('12', '1', '11', null, null), ('13', '1', '12', null, null), ('14', '1', '13', null, null), ('15', '1', '14', null, null), ('16', '1', '15', null, null), ('17', '1', '16', null, null), ('18', '1', '17', null, null), ('19', '1', '18', null, null), ('20', '1', '19', null, null), ('21', '1', '20', null, null), ('22', '1', '21', null, null), ('23', '1', '22', null, null), ('24', '1', '23', null, null), ('26', '1', '25', null, null), ('27', '1', '26', null, null), ('28', '1', '27', null, null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
