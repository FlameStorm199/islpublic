import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiMsg } from 'src/models/IApiMsg';

@Injectable({
  providedIn: 'root'
})
export class ConteggioService {

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
    // return throwError(() => new Error(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")"));
    alert(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")");
    return throwError(() => new Error(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")"));
  }

  public rimuoviBancale(id_pallet : any){
    return this.http.delete<IApiMsg>((`https://${environment.serverURI}/api/bancali/rimozione/${id_pallet}`)).pipe(
      catchError(this.handleError)
    );
  }

  public startConteggio(pallets : any, area : any){ 
    sessionStorage.setItem("Pallets", JSON.stringify(pallets));
    sessionStorage.setItem("Area", JSON.stringify(area));
    sessionStorage.setItem("ConteggioStarted", "true");
  }

  public isStarted(){
    if(sessionStorage.getItem("ConteggioStarted") == null || sessionStorage.getItem("ConteggioStarted") != "true")
      return false;
    return true;
  }

  public getPallets(){
    let code : string = "";
    var temp = sessionStorage.getItem("Pallets");
    var temp2 : any[] = [];

    if(temp != null){
      code = temp;
      return JSON.parse(code);
    }else{
      return temp2;
    }   
  }

  public getArea(){
    let code : string = "";
    var temp = sessionStorage.getItem("Area");
    var temp2 : any[] = [];

    if(temp != null){
      code = temp;
      return JSON.parse(code);
    }else{
      return temp2;
    }   
  }

  public stopConteggio(){
    sessionStorage.removeItem("ConteggioStarted");
    sessionStorage.removeItem("Pallets");
    sessionStorage.removeItem("Area");
  }
}
