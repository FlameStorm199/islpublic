export interface ITask{
    id : any,
    nome : string,
    descrizione : string,
    tipologia : string,
    status : number,
    data_ora_scadenza : Date | any,
    data_ora_completamento : Date | any,
    urgenza : number,
    info_ulteriori : string,
    codice_posto_provenienza : string,
    codice_scaffale_provenienza : string,
    codice_area_provenienza : string,
    codice_magazzino_provenienza : string,
    codice_posto_destinazione : string,
    codice_scaffale_destinazione : string,
    codice_area_destinazione : string,
    codice_magazzino_destinazione : string
}