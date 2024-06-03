INSERT INTO magazzini VALUES('001','Via Franchini 1','Villorba');

INSERT INTO utenti VALUES
    ('simone','3jXysuly4xTZ48WN34acsA==;E9NPygwpl7OgQjXC70bVCgDzzIVqW3HR5w13vG+ObaA=','Simone','Vanin','2005-07-04','Treviso','3334445555','001'),
    ('dbadmin','3jXysuly4xTZ48WN34acsA==;E9NPygwpl7OgQjXC70bVCgDzzIVqW3HR5w13vG+ObaA=','Amministratore','di Sistema','1990-01-15','New York','123456789','001');    -- password = password123

INSERT INTO ruoli VALUES
    (100,'LAVORATORE'),
    (200,'RESPONSABILE');

INSERT INTO utenti_ruoli VALUES
    ('simone',100),
    ('dbadmin',200);

INSERT INTO aree (tipologia_area, codice_area, codice_magazzino) VALUES
('Area1', 'A01', '001'),
('Area2', 'A02', '001'),
('Area3', 'A03', '001');

INSERT INTO scaffali (codice_scaffale, codice_area, codice_magazzino) VALUES
('S01', 'A01', '001'),
('S02', 'A01', '001'),
('S03', 'A02', '001');

INSERT INTO posti (max_altezza, max_larghezza, max_lunghezza, max_peso, carico_speciale, codice_posto, codice_scaffale, codice_area, codice_magazzino) VALUES
(2.0, 1.5, 2.0, 300.0, 0, 'P000000000001', 'S01', 'A01', '001'),
(1.8, 1.2, 1.8, 250.0, 1, 'P000000000002', 'S01', 'A01', '001'),
(1.5, 1.0, 1.5, 200.0, 0, 'P000000000003', 'S02', 'A01', '001');

INSERT INTO tipologie_bancali (codice_tipologia, descrizione) VALUES
('STNDR','Bancali standard'),
('REFRI','Bancali refrigerati');

INSERT INTO bancali (numero_seriale, altezza, larghezza, lunghezza, peso, carico_speciale, data_scadenza, numero_lotto, mittente, codice_posto, codice_scaffale, codice_area, codice_magazzino, tipologia_carico) VALUES
('B000000000004', 1.0, 0.8, 1.2, 100.0, 0, '2024-04-30', 123, 'Mittente1', 'P000000000001', 'S01', 'A01', '001', 'STNDR'),
('B000000000002', 1.2, 1.0, 1.4, 150.0, 1, NULL, 456, 'Mittente2', 'P000000000002', 'S01', 'A01', '001', 'REFRI'),
('B000000000003', 1.5, 1.2, 1.8, 200.0, 0, '2024-05-20', NULL, NULL, 'P000000000003', 'S02', 'A01', '001', 'STNDR');

INSERT INTO task (nome, descrizione, tipologia, status, data_ora_scadenza, urgenza, codice_posto_provenienza, codice_scaffale_provenienza, codice_area_provenienza, codice_magazzino_provenienza, codice_posto_destinazione, codice_scaffale_destinazione, codice_area_destinazione, codice_magazzino_destinazione) VALUES
('Task1', 'Descrizione task 1', NULL, 1, '2024-04-30 12:00:00', 1, 'P000000000001', 'S01', 'A01', '001', 'P000000000002', 'S01', 'A01', '001'),
('Task2', 'Descrizione task 2', 'SPEDIZIONE', 0, '2024-03-31 15:30:00', 2, 'P000000000002', 'S01', 'A01', '001', 'P000000000003', 'S02', 'A01', '001');

INSERT INTO bancali_task (numero_seriale_bancale, id_task) VALUES
('B000000000004', 1),
('B000000000002', 2);

INSERT INTO utenti_task (username, id_task) VALUES
('simone', 1),
('dbadmin', 2);

INSERT INTO ruoli_task (id_ruolo, id_task) VALUES
(100, 1),
(200, 2);

