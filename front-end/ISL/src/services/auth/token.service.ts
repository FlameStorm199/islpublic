import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from 'src/models/IToken';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Roles } from 'src/models/Roles';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse){
    if(error.status == 0){
      error.error.messaggio = "Errore di autenticazione";
      sessionStorage.clear();
    }
    return throwError(() => new Error(error.error.messaggio+ " (Codice "+error.status+": "+error.statusText+")"));
  }

  authenticate(username: string, password: string){
    return this.http.post<IToken>((`https://${environment.serverURI}/api/utenti/auth`), {username, password}).pipe(
      catchError(this.handleError)
    )
  }

  setAuthToken(username : any, token : string){
    sessionStorage.setItem("Utente", username);
    sessionStorage.setItem("AuthToken", `Bearer ${token}`);
  }

  getAuthToken = (): string => {
    let AuthHeader: string = "";
    var AuthToken = sessionStorage.getItem("AuthToken");

    if(AuthToken != null)
      AuthHeader = AuthToken;

    return AuthHeader;
  }

  getLoggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => sessionStorage.getItem("Utente") ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => sessionStorage.clear();

  isAdmin = (): boolean => {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getAuthToken());

    var items = decodedToken['role'];
    var ruoli = [];

    if(!Array.isArray(items))
      ruoli.push(items);
    else
      ruoli = items;

    return ruoli.some(r => Roles.admin == r) ? true : false;
  }
}
