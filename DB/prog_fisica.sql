CREATE DATABASE IF NOT EXISTS isl_masterDB;
USE isl_masterDB;

CREATE TABLE magazzini(
    codice_magazzino CHAR(3) PRIMARY KEY,
    indirizzo VARCHAR(100),
    citta VARCHAR(30)
);

CREATE TABLE aree(
    tipologia_area VARCHAR(100),
    codice_area CHAR(3),
    codice_magazzino CHAR(3),
    CONSTRAINT are_mag FOREIGN KEY(codice_magazzino) REFERENCES magazzini(codice_magazzino) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(codice_area, codice_magazzino)
);

CREATE TABLE scaffali(
    codice_scaffale CHAR(3),
    codice_area CHAR(3),
    codice_magazzino CHAR(3),
    CONSTRAINT sca_are_mag FOREIGN KEY(codice_area,codice_magazzino) REFERENCES aree(codice_area,codice_magazzino) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(codice_scaffale, codice_area, codice_magazzino)
);

CREATE TABLE posti(
    max_altezza DECIMAL(5,2) UNSIGNED NOT NULL,
    max_larghezza DECIMAL(5,2) UNSIGNED NOT NULL,
    max_lunghezza DECIMAL(5,2) UNSIGNED NOT NULL,
    max_peso DECIMAL(5,2) UNSIGNED NOT NULL,
    carico_speciale BOOLEAN NOT NULL,
    codice_posto CHAR(13),
    codice_scaffale CHAR(3),
    codice_area CHAR(3),
    codice_magazzino CHAR(3),
    CONSTRAINT pos_sca_are_mag FOREIGN KEY(codice_scaffale,codice_area,codice_magazzino) REFERENCES scaffali(codice_scaffale,codice_area,codice_magazzino) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(codice_posto, codice_scaffale, codice_area, codice_magazzino)
);

CREATE TABLE tipologie_bancali(
    codice_tipologia CHAR(5) PRIMARY KEY,
    descrizione VARCHAR(100) NOT NULL
);

CREATE TABLE bancali(
    numero_seriale CHAR(13) PRIMARY KEY,
    altezza DECIMAL(5,2) UNSIGNED NOT NULL,
    larghezza DECIMAL(5,2) UNSIGNED NOT NULL,
    lunghezza DECIMAL(5,2) UNSIGNED NOT NULL,
    peso DECIMAL(5,2) UNSIGNED NOT NULL,
    carico_speciale BOOLEAN NOT NULL,
    data_scadenza DATE,
    numero_lotto INT,
    mittente VARCHAR(100),
    codice_posto CHAR(13),
    codice_scaffale CHAR(3),
    codice_area CHAR(3),
    codice_magazzino CHAR(3),
    tipologia_carico CHAR(5),
    CONSTRAINT ban_pos_sca_are_mag FOREIGN KEY(codice_posto,codice_scaffale,codice_area,codice_magazzino) REFERENCES posti(codice_posto,codice_scaffale,codice_area,codice_magazzino) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT ban_tip FOREIGN KEY(tipologia_carico) REFERENCES tipologie_bancali(codice_tipologia)
);

CREATE TABLE utenti(
    username VARCHAR(30) BINARY PRIMARY KEY,
    password VARCHAR(100) BINARY NOT NULL,
    nome VARCHAR(30) NOT NULL,
    cognome VARCHAR(30) NOT NULL,
    data_nascita DATE,
    luogo_nascita VARCHAR(100),
    telefono CHAR(10),
    codice_magazzino CHAR(3) NOT NULL,
    CONSTRAINT ute_mag FOREIGN KEY(codice_magazzino) REFERENCES magazzini(codice_magazzino) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE ruoli(
    id INT UNSIGNED PRIMARY KEY,
    descrizione VARCHAR(100) NOT NULL
);

CREATE TABLE task(
    id INT(10) UNSIGNED ZEROFILL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    descrizione TEXT NOT NULL,
    tipologia ENUM('SPEDIZIONE','RICEZIONE','CONTEGGIO','SPOSTAMENTO'),
    status TINYINT NOT NULL,
    data_ora_scadenza DATETIME,
    data_ora_completamento DATETIME,
    urgenza TINYINT NOT NULL,
    info_ulteriori TEXT,
    codice_posto_provenienza CHAR(13),
    codice_scaffale_provenienza CHAR(3),
    codice_area_provenienza CHAR(3),
    codice_magazzino_provenienza CHAR(3),
    codice_posto_destinazione CHAR(13),
    codice_scaffale_destinazione CHAR(3),
    codice_area_destinazione CHAR(3),
    codice_magazzino_destinazione CHAR(3),
    CONSTRAINT task_provenienza FOREIGN KEY(codice_posto_provenienza,codice_scaffale_provenienza,codice_area_provenienza,codice_magazzino_provenienza) REFERENCES posti(codice_posto,codice_scaffale,codice_area,codice_magazzino) ON UPDATE NO ACTION ON DELETE NO ACTION,        
    CONSTRAINT task_destinazione FOREIGN KEY(codice_posto_destinazione,codice_scaffale_destinazione,codice_area_destinazione,codice_magazzino_destinazione) REFERENCES posti(codice_posto,codice_scaffale,codice_area,codice_magazzino) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE bancali_task(
    numero_seriale_bancale CHAR(13),
    id_task INT(10) UNSIGNED ZEROFILL,
    CONSTRAINT bt_bancali FOREIGN KEY(numero_seriale_bancale) REFERENCES bancali(numero_seriale) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT bt_task FOREIGN KEY(id_task) REFERENCES task(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(numero_seriale_bancale, id_task)
);

CREATE TABLE utenti_task(
    username VARCHAR(30) BINARY,
    id_task INT(10) UNSIGNED ZEROFILL,
    CONSTRAINT ut_utenti FOREIGN KEY(username) REFERENCES utenti(username) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ut_task FOREIGN KEY(id_task) REFERENCES task(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(username, id_task)
);

CREATE TABLE ruoli_task(
    id_ruolo INT UNSIGNED,
    id_task INT(10) UNSIGNED ZEROFILL,
    CONSTRAINT rt_ruoli FOREIGN KEY(id_ruolo) REFERENCES ruoli(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT rt_task FOREIGN KEY(id_task) REFERENCES task(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_ruolo, id_task)
);

CREATE TABLE utenti_ruoli(
    username VARCHAR(30) BINARY,
    id_ruolo INT UNSIGNED,
    CONSTRAINT ur_utenti FOREIGN KEY(username) REFERENCES utenti(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ur_ruoli FOREIGN KEY(id_ruolo) REFERENCES ruoli(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(username, id_ruolo)
);