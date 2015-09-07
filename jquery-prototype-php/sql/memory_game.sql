
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


drop database if exists `memory_game`;
create database `memory_game` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
use `memory_game`;

create table player_info
(   id int unsigned not null auto_increment primary key,
	name  char(30) not null,
	email char(50) not null
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


create table score
(
	id int unsigned not null auto_increment primary key,
	user_id int unsigned not null,
	score int signed not null,
	submit_time datetime not null
) ENGINE=MyISAM;
