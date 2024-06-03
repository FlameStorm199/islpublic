import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IError } from 'src/models/IError';
import { IBancale } from 'src/models/IBancale';
import { ITask } from 'src/models/ITask';
import { IApiMsg } from 'src/models/IApiMsg';

@Injectable({
  providedIn: 'root'
})
export class BancaliService {
  public bancali : any[] = [];
  public lastCode : string = "";

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

  public getAllPallets(){
    return this.http.get<IBancale[]>((`https://${environment.serverURI}/api/bancali/elenco/bancali`)).pipe(
      catchError(this.handleError)
    )
  }

  public getPalletsByArea(area : string){
    return this.http.get<IBancale[]>((`https://${environment.serverURI}/api/bancali/cerca/area/001/${area}`)).pipe(
      catchError(this.handleError)
    )
  }

  public retrievePallet(id: string){
    return this.http.get<IBancale>((`https://${environment.serverURI}/api/bancali/cerca/codice/${id}`)).pipe(
      catchError(this.handleError)
    )
  }
}
