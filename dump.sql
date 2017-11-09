
CREATE TABLE `util` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `role` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_login_uindex` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ;



INSERT INTO util (id,login,password,first_name,last_name,birthdate,role) VALUES (1,'jdoe','jdoepwd','john','doe',{d '1998-08-12'},'ADMIN');
INSERT INTO util (id,login,password,first_name,last_name,birthdate,role) VALUES (2,'juju','juju','ju','do',{d '1997-07-17'},'NONE');
INSERT INTO util (id,login,password,first_name,last_name,birthdate,role) VALUES (3,'watcher','watcher','loic','legoff',{d '2012-05-10'},'WATCHER');
