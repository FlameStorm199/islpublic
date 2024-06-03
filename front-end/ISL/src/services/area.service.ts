import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArea } from 'src/models/IArea';
import { IScaffale } from 'src/models/IScaffale';
import { IPosto } from 'src/models/IPosto';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http : HttpClient) { }

  public getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public handleError(error: HttpErrorResponse){
    if(error.status == 0){
      error.error.messaggio = "Errore di autenticazione";
      sessionStorage.clear();
    }
    return throwError(() => new Error(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")"));
  }

  public getAllWarehouses(){
    return this.http.get<string[]>((`https://${environment.serverURI}/api/bancali/elenco/magazzini`)).pipe(
      catchError(this.handleError)
    )
  }

  public getAllAreas(){
    return this.http.get<IArea[]>((`https://${environment.serverURI}/api/bancali/elenco/aree/001`)).pipe(
      catchError(this.handleError)
    )
  }

  public getScaffaliPerArea(id_area : any){
    return this.http.get<IScaffale[]>((`https://${environment.serverURI}/api/bancali/elenco/scaffali/001/${id_area}`)).pipe(
      catchError(this.handleError)
    )
  }

  public getPostiPerScaffale(id_area : any, id_scaffale : any){
    return this.http.get<IPosto[]>((`https://${environment.serverURI}/api/bancali/elenco/posti/001/${id_area}/${id_scaffale}`)).pipe(
      catchError(this.handleError)
    )
  }

  public getBancalePerPosto(id_area : any, id_scaffale : any, id_posto : any){
    return this.http.get<IPosto>((`https://${environment.serverURI}/api/bancali/cerca/posto/001/${id_area}/${id_scaffale}/${id_posto}`)).pipe(
      catchError(this.handleError)
    )
  }
}
