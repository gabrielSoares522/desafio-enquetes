DROP DATABASE IF EXISTS enqueteDB;
CREATE DATABASE IF NOT EXISTS enqueteDB;
USE enqueteDB;

DROP TABLE IF EXISTS enquete;
CREATE TABLE IF NOT EXISTS enquete (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    dt_inicio TIMESTAMP,
    dt_fim TIMESTAMP
);

DROP TABLE IF EXISTS opcao;
CREATE TABLE IF NOT EXISTS opcao(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_enquete INT,
    resposta VARCHAR(100),
    qt_votos INT,
    CONSTRAINT FK_opcao FOREIGN KEY (id_enquete) REFERENCES enquete(id)
);