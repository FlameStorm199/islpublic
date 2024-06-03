export interface IUtente {
    username : string,
    nome : string,
    cognome : string,
    dataNascita : Date | null,
    luogoNascita : string | null,
    telefono : string | null,
    magazzino : string
    ruoli : string[]
}