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

 Date: 04/09/2019 17:49:49 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `modules`
-- ----------------------------
DROP TABLE IF EXISTS `modules`;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `isMenu` int(11) DEFAULT NULL,
  `isLeafNode` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `iconfont` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `describe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `modules`
-- ----------------------------
BEGIN;
INSERT INTO `modules` VALUES ('1', '权限管理', 'auth', '1', null, '/auth', 'solution', '1', '', '2019-04-04 03:19:39.000000', '2019-04-04 03:19:39.000000', null), ('2', '用户管理', 'auth.user', '1', '1', '/auth/users', 'user', '0', '1', '2019-04-04 11:23:47.000000', '2019-04-08 09:10:34.000000', ''), ('3', '用户组管理', 'auth.group', '1', '1', '/auth/group', 'team', null, '1', '2019-04-04 11:25:09.000000', '2019-04-04 11:25:11.000000', null), ('4', '功能模块管理', 'auth.module', '1', '1', '/auth/modules', 'solution', '0', '1', '2019-04-04 11:26:14.000000', '2019-04-04 11:26:17.000000', null), ('5', '用户列表', 'auth.user.index', null, null, '', null, null, '2', null, null, null), ('6', '新建用户', 'auth.user.create', null, null, null, null, null, '2', null, null, null), ('7', '模块列表', 'auth.module.index', null, null, null, null, null, '4', null, null, null), ('8', '添加模块', 'auth.module.create', null, null, null, null, null, '4', null, null, null), ('9', '重置密码', 'auth.user.setPassword', null, null, null, null, null, '2', null, null, null), ('10', '修改用户详情', 'auth.user.update', null, null, null, null, null, '2', null, null, null), ('11', '查看用户详情', 'sys.editProfile.edit', null, null, null, null, null, '2', null, null, null), ('12', '用户组列表', 'auth.group.index', null, null, null, null, null, '3', null, null, null), ('13', '添加用户组', 'auth.group.create', null, null, null, null, null, '3', null, null, null), ('14', '系统级模块列表', 'auth.module.system', null, null, null, null, null, '4', null, null, null), ('15', '查看模块详情', 'auth.module.detail', null, null, null, null, null, '4', null, null, null), ('16', '修改模块详情', 'auth.module.update', null, null, null, null, null, '4', null, null, null), ('17', '删除模块列表', 'auth.module.destroy', null, null, null, null, null, '4', null, null, null), ('18', '权限查看', 'auth.group.getModule', null, null, null, null, null, '3', null, null, null), ('19', '成员设置', 'auth.group.setUser', null, null, null, null, null, '3', null, null, null), ('20', '删除用户组', 'auth.group.destroy', null, null, null, null, null, '3', null, null, null), ('21', '用户组详情', 'auth.group.detail', null, null, null, null, null, '3', null, null, null), ('22', '修改用户组详情', 'auth.group.update', null, null, null, null, null, '3', null, null, null), ('23', '查看用户详情', 'auth.user.detail', null, null, null, null, null, '2', null, null, null), ('25', '删除用户', 'auth.user.destroy', '0', '0', null, null, null, '2', '2019-04-09 01:23:53.000000', '2019-04-09 01:23:53.000000', null), ('26', '成员查看', 'auth.group.getUser', '0', '0', null, null, null, '3', '2019-04-09 02:15:27.000000', '2019-04-09 02:15:27.000000', null), ('27', '权限设置', 'auth.group.setModule', '0', '0', null, null, null, '3', '2019-04-09 08:12:07.000000', '2019-04-09 08:12:07.000000', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
