
SET NAMES utf8;
SET character_set_client = utf8mb4;

USE emp;
CREATE TABLE employee(
registration_ID INT(10) NOT NULL auto_increment,
firstname VARCHAR(20) NOT NULL,
lastname VARCHAR(20) NOT NULL,
email VARCHAR(20) NOT NULL,
PRIMARY KEY (registration_ID))ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;



