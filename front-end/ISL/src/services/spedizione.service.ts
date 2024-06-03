import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiMsg } from 'src/models/IApiMsg';

@Injectable({
  providedIn: 'root'
})
export class SpedizioneService {
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

  public removePallet(id_pallet : any){
    return this.http.delete<IApiMsg>((`https://${environment.serverURI}/api/bancali/rimozione/${id_pallet}`)).pipe(
      catchError(this.handleError)
    );
  }

  public startSpedizione(pallets : any[]){ 
    sessionStorage.setItem("Pallets", JSON.stringify(pallets));
    sessionStorage.setItem("SpedizioneStarted", "true");
  }

  public isStarted(){
    if(sessionStorage.getItem("SpedizioneStarted") == null || sessionStorage.getItem("SpedizioneStarted") != "true")
      return false;
    return true;
  }

  public removePalletSession(pallet : any){
    var bancali : any[] = this.getPallets();
    bancali.splice(bancali.findIndex(b => b.bancale.numeroSeriale == pallet.bancale.numeroSeriale), 1);
    if(bancali.length == 0) return 0;
    sessionStorage.setItem("Pallets", JSON.stringify(bancali));
    return 1;
  }

  public removeCustomPalletSession(pallet : any){
    var bancali : any[] = this.getPallets();
    bancali.splice(bancali.findIndex(b => b.numeroSeriale == pallet.numeroSeriale), 1);
    if(bancali.length == 0) return 0;
    sessionStorage.setItem("Pallets", JSON.stringify(bancali));
    return 1;
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

  public clearSpedizione(){
    sessionStorage.removeItem("Pallets");
    sessionStorage.removeItem("SpedizioneStarted");
  }
}
