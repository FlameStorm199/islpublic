import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiMsg } from 'src/models/IApiMsg';

@Injectable({
  providedIn: 'root'
})
export class RicezioneService {

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

  public createPallet(pallet : any){
    return this.http.post<IApiMsg>((`https://${environment.serverURI}/api/bancali/inserimento`), pallet).pipe(
      catchError(this.handleError)
    );
  }

  public saveCode(code : number){
    sessionStorage.setItem("LastCode", JSON.stringify(code));
  }

  public savePallet(pallet : any){
    var bancali = this.getPallets();
    bancali.push(pallet);
    sessionStorage.setItem("Pallets", JSON.stringify(bancali));
  }

  public getLastCode(){
    let code : string = "";
    var temp = sessionStorage.getItem("LastCode");

    if(temp != null){
      code = temp;
      return JSON.parse(code);
    }else{
      return null;
    }    
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

  public clearCodeAndPallets(){
    sessionStorage.removeItem("LastCode");
    sessionStorage.removeItem("Pallets");
  }
}
