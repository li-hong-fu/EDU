/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : localhost:3306
 Source Schema         : combat-edu

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 11/06/2020 14:53:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for advertise
-- ----------------------------
DROP TABLE IF EXISTS `advertise`;
CREATE TABLE `advertise`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '广告名称',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '广告位置',
  `width` double NULL DEFAULT NULL COMMENT '宽',
  `height` double NULL DEFAULT NULL COMMENT '高',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of advertise
-- ----------------------------
INSERT INTO `advertise` VALUES (1, '墙头生了颗草666', 'index_banner', 1280, 640, '2020-06-10 14:03:30', '2020-06-10 14:03:41');

-- ----------------------------
-- Table structure for advertise-material
-- ----------------------------
DROP TABLE IF EXISTS `advertise-material`;
CREATE TABLE `advertise-material`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物料名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '打开方式',
  `jump_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '跳转链接',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '物料图片',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of advertise-material
-- ----------------------------
INSERT INTO `advertise-material` VALUES (1, '畜生、打靶鬼', NULL, '_blank', 'http://www.hao123.com', 'http://qbnjwnz9h.bkt.clouddn.com/test/1591797872308_1179057a1212bb80971a22d49661d4f1.jpg', '2020-06-10 14:04:34', '2020-06-10 14:05:43');

-- ----------------------------
-- Table structure for advertise-relation
-- ----------------------------
DROP TABLE IF EXISTS `advertise-relation`;
CREATE TABLE `advertise-relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `advertise_id` int(11) NULL DEFAULT NULL COMMENT '广告ID',
  `materiel_id` int(11) NULL DEFAULT NULL COMMENT '物料ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of advertise-relation
-- ----------------------------
INSERT INTO `advertise-relation` VALUES (1, NULL, 1, 1);

-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业名称',
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业短称',
  `slogan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业口号',
  `code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业编号',
  `introduction` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '企业介绍',
  `contact_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人',
  `contact_phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '封面',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of companies
-- ----------------------------
INSERT INTO `companies` VALUES (1, '期权股份有限公司6666', '期权', '哈哈哈哈哈哈哈', '1233211234567', '整个企业只有老板一个人', '吃显老', '12516324789', 'http://qbnjwnz9h.bkt.clouddn.com/test/1591797402574_1179057a1212bb80971a22d49661d4f1.jpg', '2020-06-10 13:56:45', '2020-06-10 13:57:00');

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程短称',
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程提示',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '课程描述',
  `status` int(11) NULL DEFAULT NULL COMMENT '课程状态',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '课程封面图',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (1, 'HTML', 'HTML基础', 'HTML文本是由HTML命令组成的描述性文本，HTML命令可以说明文字，图形、动画、声音、表格、链接等', 'HTML称为超文本标记语言，是一种标识性的语言。它包括一系列标签．通过这些标签可以将网络上的文档格式统一，使分散的Internet资源连接为一个逻辑整体', 0, 'http://qbnjwnz9h.bkt.clouddn.com/test/1591795282356_fcfaaf51f3deb48fed44b731fe1f3a292df5782b.jpg', '2020-06-10 13:21:25', NULL);
INSERT INTO `courses` VALUES (2, 'CSS', 'CSS基础', '层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。', 'CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行...', 0, 'http://qbnjwnz9h.bkt.clouddn.com/test/1591795343448_9e3df8dcd100baa1d0fded644f10b912c9fc2e1f.jpg', '2020-06-10 13:22:26', NULL);

-- ----------------------------
-- Table structure for courses-chapters
-- ----------------------------
DROP TABLE IF EXISTS `courses-chapters`;
CREATE TABLE `courses-chapters`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `course_id` int(11) NULL DEFAULT NULL COMMENT '关联课程',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '章名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '章排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses-chapters
-- ----------------------------
INSERT INTO `courses-chapters` VALUES (1, 1, '第一章', 0, '2020-06-10 13:25:20', NULL);
INSERT INTO `courses-chapters` VALUES (2, 1, '第二章', 1, '2020-06-10 13:26:26', NULL);

-- ----------------------------
-- Table structure for courses-sections
-- ----------------------------
DROP TABLE IF EXISTS `courses-sections`;
CREATE TABLE `courses-sections`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `chapter_id` int(11) NULL DEFAULT NULL COMMENT '关联章',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '节名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '节内容',
  `video_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '节视频地址',
  `sort` int(11) NULL DEFAULT NULL COMMENT '节排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses-sections
-- ----------------------------
INSERT INTO `courses-sections` VALUES (1, 1, '第一章第一小节', '<p>就是这么样</p>', 'http://www.hao123.com', 0, '2020-06-10 13:25:51', '2020-06-10 13:27:13');
INSERT INTO `courses-sections` VALUES (2, 1, '第一章第二小节', '<p>321312321</p>', 'http://aaaa.com', 1, '2020-06-10 13:26:58', NULL);
INSERT INTO `courses-sections` VALUES (3, 2, '第二章第一小节', '<p>ddasaadasaaddasaaaa</p>', 'www.aaaaa.com', 0, '2020-06-10 13:27:38', NULL);
INSERT INTO `courses-sections` VALUES (4, 2, '第二章第二小节', '<p>hhhaahaa</p>', 'www.aoaoa.com', 1, '2020-06-10 13:27:59', NULL);

-- ----------------------------
-- Table structure for managers
-- ----------------------------
DROP TABLE IF EXISTS `managers`;
CREATE TABLE `managers`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机',
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of managers
-- ----------------------------
INSERT INTO `managers` VALUES (1, '黎明', '13600000000', 1, '123456', '2020-06-10 20:02:33', '2020-06-10 13:08:42');
INSERT INTO `managers` VALUES (2, '师弟', '13500000000', 2, '123456', '2020-06-10 13:18:37', NULL);

-- ----------------------------
-- Table structure for managers-permission_groups
-- ----------------------------
DROP TABLE IF EXISTS `managers-permission_groups`;
CREATE TABLE `managers-permission_groups`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of managers-permission_groups
-- ----------------------------
INSERT INTO `managers-permission_groups` VALUES (1, '职业课程');
INSERT INTO `managers-permission_groups` VALUES (2, '项目管理');
INSERT INTO `managers-permission_groups` VALUES (3, '测评管理');
INSERT INTO `managers-permission_groups` VALUES (4, '广告物料');
INSERT INTO `managers-permission_groups` VALUES (5, '权限管理');

-- ----------------------------
-- Table structure for managers-permissions
-- ----------------------------
DROP TABLE IF EXISTS `managers-permissions`;
CREATE TABLE `managers-permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标识',
  `group_id` int(11) NULL DEFAULT NULL COMMENT '权限组id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of managers-permissions
-- ----------------------------
INSERT INTO `managers-permissions` VALUES (1, '职业管理', 'zhiye', 1);
INSERT INTO `managers-permissions` VALUES (2, '课程管理', 'courses', 1);
INSERT INTO `managers-permissions` VALUES (3, '企业管理', 'companies', 2);
INSERT INTO `managers-permissions` VALUES (4, '项目管理', 'project', 2);
INSERT INTO `managers-permissions` VALUES (5, '技能管理', 'stacks', 3);
INSERT INTO `managers-permissions` VALUES (6, '题库管理', 'question', 3);
INSERT INTO `managers-permissions` VALUES (7, '广告管理', 'advertise', 4);
INSERT INTO `managers-permissions` VALUES (8, '物料管理', 'material', 4);
INSERT INTO `managers-permissions` VALUES (9, '管理员管理', 'role', 5);

-- ----------------------------
-- Table structure for managers-role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `managers-role_permissions`;
CREATE TABLE `managers-role_permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `permission_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of managers-role_permissions
-- ----------------------------
INSERT INTO `managers-role_permissions` VALUES (1, 1, 'zhiye,courses,project,companies,stacks,question,material,advertise,role');
INSERT INTO `managers-role_permissions` VALUES (2, 2, 'companies,project');

-- ----------------------------
-- Table structure for managers-roles
-- ----------------------------
DROP TABLE IF EXISTS `managers-roles`;
CREATE TABLE `managers-roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of managers-roles
-- ----------------------------
INSERT INTO `managers-roles` VALUES (1, '管理员', '拥有所有权限', '2020-06-10 12:57:28', '2020-06-10 13:07:13');
INSERT INTO `managers-roles` VALUES (2, '项目管理员', '拥有企业项目管理权限', '2020-06-10 13:18:00', NULL);

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目描述',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '项目内容',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '项目封面',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (1, '跑步机宣传6666', '主要让我们的跑步机更好卖', NULL, NULL, 'http://qbnjwnz9h.bkt.clouddn.com/test/1591797490058_timg.jpg', '2020-06-10 13:58:12', '2020-06-10 13:58:25');

-- ----------------------------
-- Table structure for projects-stories
-- ----------------------------
DROP TABLE IF EXISTS `projects-stories`;
CREATE TABLE `projects-stories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `version_id` int(11) NULL DEFAULT NULL COMMENT '项目版本id,',
  `project_id` int(11) NULL DEFAULT NULL COMMENT '项目id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '故事名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects-stories
-- ----------------------------
INSERT INTO `projects-stories` VALUES (1, NULL, 1, '神经病的故事', '从前有个神经病死了', 1, '2020-06-10 13:59:07', NULL);
INSERT INTO `projects-stories` VALUES (2, NULL, 1, '老人故事', '这个人很老很老，唠叨', 0, '2020-06-10 13:59:48', NULL);

-- ----------------------------
-- Table structure for projects-tasks
-- ----------------------------
DROP TABLE IF EXISTS `projects-tasks`;
CREATE TABLE `projects-tasks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `story_id` int(11) NULL DEFAULT NULL COMMENT '项目故事id',
  `version_id` int(11) NULL DEFAULT NULL COMMENT '项目版本id',
  `project_id` int(11) NULL DEFAULT NULL COMMENT '项目id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态',
  `level` int(11) NULL DEFAULT NULL COMMENT '水平',
  `platform` int(11) NULL DEFAULT NULL COMMENT '平台',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects-tasks
-- ----------------------------
INSERT INTO `projects-tasks` VALUES (1, 1, NULL, 1, '打死把就', NULL, NULL, NULL, NULL, 0, '2020-06-10 13:59:19', NULL);
INSERT INTO `projects-tasks` VALUES (2, 1, NULL, 1, '唠唠叨叨', NULL, NULL, NULL, NULL, 1, '2020-06-10 14:00:06', NULL);
INSERT INTO `projects-tasks` VALUES (3, 2, NULL, 1, '你老味', NULL, NULL, NULL, NULL, 1, '2020-06-10 14:00:13', NULL);
INSERT INTO `projects-tasks` VALUES (4, 2, NULL, 1, '不敢讲', NULL, NULL, NULL, NULL, 0, '2020-06-10 14:00:23', NULL);

-- ----------------------------
-- Table structure for projects-versions
-- ----------------------------
DROP TABLE IF EXISTS `projects-versions`;
CREATE TABLE `projects-versions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `project_id` int(11) NULL DEFAULT NULL COMMENT '项目id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目版本名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '项目版本排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects-versions
-- ----------------------------
INSERT INTO `projects-versions` VALUES (1, 1, '12.0.1', 1, '2020-06-10 13:58:41', NULL);
INSERT INTO `projects-versions` VALUES (2, 1, '12.1.1', 0, '2020-06-10 14:01:04', NULL);

-- ----------------------------
-- Table structure for stacks
-- ----------------------------
DROP TABLE IF EXISTS `stacks`;
CREATE TABLE `stacks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '等级',
  `image_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '封面',
  `tag_line` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标示',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stacks
-- ----------------------------
INSERT INTO `stacks` VALUES (1, '旋风腿之666', NULL, 'http://qbnjwnz9h.bkt.clouddn.com/test/1591797194093_u=3014635857,1573008816&fm=26&gp=0.jpg', '踢踢踢踢踢', '不用说，反正很牛掰，就是牛掰的要命。', NULL, '2020-06-10 13:53:42');

-- ----------------------------
-- Table structure for stacks-questions
-- ----------------------------
DROP TABLE IF EXISTS `stacks-questions`;
CREATE TABLE `stacks-questions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `stem` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '题目',
  `stack_id` int(11) NULL DEFAULT NULL COMMENT '技能id',
  `level` int(11) NULL DEFAULT NULL COMMENT '等级',
  `option` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '选项',
  `currect` int(11) NULL DEFAULT NULL COMMENT '答案',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stacks-questions
-- ----------------------------
INSERT INTO `stacks-questions` VALUES (1, '旋风腿之666的关键', 1, 1, '[{\"value\":\"能踢\",\"key\":1591797257667},{\"value\":\"会旋转\",\"key\":1591797259095}]', 1, '2020-06-10 13:54:50', '2020-06-10 13:55:14');

-- ----------------------------
-- Table structure for user-sms
-- ----------------------------
DROP TABLE IF EXISTS `user-sms`;
CREATE TABLE `user-sms`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `template` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模版名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '验证码',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user-sms
-- ----------------------------
INSERT INTO `user-sms` VALUES (1, NULL, NULL, '13600000000', '586683', NULL, '2020-06-11 01:57:55', '2020-06-11 03:00:25');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名称',
  `real_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '真实名称',
  `unionid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信 unionid',
  `section_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '登录状态',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `avatar_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '头像',
  `sex` int(11) NULL DEFAULT NULL COMMENT '性别',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '介绍',
  `last_visit_at` datetime(0) NULL DEFAULT NULL COMMENT '最近登录时间',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '神经病的', NULL, 'ocWmn1Ng3Ft0513o68wLzhyt5UAw', '1', '13600000000', 'http://qbnjwnz9h.bkt.clouddn.com/test/1591842474024_u=3014635857,1573008816&fm=26&gp=0.jpg', 1, '1999-07-28', '刚从精神病院出来搞屎', '2020-06-11 02:47:33', '2020-06-11 02:26:57', '2020-06-11 02:28:55');

-- ----------------------------
-- Table structure for zhiye
-- ----------------------------
DROP TABLE IF EXISTS `zhiye`;
CREATE TABLE `zhiye`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '职业名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '职业排序',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '职业封面图',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '职业描述',
  `status` int(11) NULL DEFAULT NULL COMMENT '职业状态',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zhiye
-- ----------------------------
INSERT INTO `zhiye` VALUES (1, '微信小程序工程师1', NULL, 'http://qbnjwnz9h.bkt.clouddn.com/test/1591795467321_timg.jpg', '专门研发微信小程序，让微信用户可以又更好体验', NULL, '2020-06-10 13:24:52', '2020-06-10 13:32:20');

-- ----------------------------
-- Table structure for zhiye-path
-- ----------------------------
DROP TABLE IF EXISTS `zhiye-path`;
CREATE TABLE `zhiye-path`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路径名称',
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路径排序',
  `zhiye_id` int(11) NULL DEFAULT NULL COMMENT '职业id',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zhiye-path
-- ----------------------------
INSERT INTO `zhiye-path` VALUES (1, '初级工程师', '1', 1, '初级', '2020-06-10 13:29:22', NULL);
INSERT INTO `zhiye-path` VALUES (2, '中级工程师', '0', 1, '中级', '2020-06-10 13:29:35', NULL);
INSERT INTO `zhiye-path` VALUES (3, '高级工程师', '2', 1, '高级', '2020-06-10 13:29:48', NULL);

-- ----------------------------
-- Table structure for zhiye_courses
-- ----------------------------
DROP TABLE IF EXISTS `zhiye_courses`;
CREATE TABLE `zhiye_courses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `zhiye_id` int(11) NULL DEFAULT NULL COMMENT '职业id',
  `path_id` int(11) NULL DEFAULT NULL COMMENT '路径id',
  `course_id` int(11) NULL DEFAULT NULL COMMENT '课程id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zhiye_courses
-- ----------------------------
INSERT INTO `zhiye_courses` VALUES (11, 1, 1, 2, 1);
INSERT INTO `zhiye_courses` VALUES (12, 0, 1, 2, 2);
INSERT INTO `zhiye_courses` VALUES (13, 1, 1, 1, 2);
INSERT INTO `zhiye_courses` VALUES (14, 0, 1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
