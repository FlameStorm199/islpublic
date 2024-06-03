export interface IBancale{
    NumeroSeriale : string,
    Peso : number,
    Altezza : number,
    Lunghezza : number,
    Larghezza : number,
    CaricoSpeciale : boolean,
    DataScadenza : Date | null,
    NumeroLotto : number | null,
    Mittente : string | null,
    TipologiaCarico : string | null,
    CodicePosto : string | null,
    CodiceScaffale : string | null,
    CodiceArea : string | null,
    CodiceMagazzino : string | null
}