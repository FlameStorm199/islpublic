import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiMsg } from 'src/models/IApiMsg';
import { IUtente } from 'src/models/IUtente';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse){
    if(error.status == 0){
      error.error.messaggio = "Errore di autenticazione";
      sessionStorage.clear();
    }
    return throwError(() => new Error(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")"));
  }

  retrieveUserData(username : string){
    return this.http.get<IUtente>((`https://${environment.serverURI}/api/utenti/cerca/username/${username}`)).pipe(
      catchError(this.handleError)
    )
  }

  getAllUsers(){
    return this.http.get<IUtente[]>((`https://${environment.serverURI}/api/utenti/elenco`)).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(username : string){
    return this.http.delete<IApiMsg>((`https://${environment.serverURI}/api/utenti/rimozione/${username}`)).pipe(
      catchError(this.handleError)
    )
  }

  addUser(user : any){
    return this.http.post<IApiMsg>((`https://${environment.serverURI}/api/utenti/inserimento`), user).pipe(
      catchError(this.handleError)
    )
  }

  editUser(user : any){
    return this.http.put<IApiMsg>((`https://${environment.serverURI}/api/utenti/modifica`), user).pipe(
      catchError(this.handleError)
    )
  }
}
