import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { ITask } from 'src/models/ITask';
import { environment } from 'src/environments/environment';
import { IApiMsg } from 'src/models/IApiMsg';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks : any[] = [];
  public taskInCompletion : number | null = null; 

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

  public getTasks(){
    return this.http.get<ITask[]>((`https://${environment.serverURI}/api/task/elenco`)).pipe(
      catchError(this.handleError)
    )
  }

  public retrieveTask(id: number){
    return this.http.get<ITask>((`https://${environment.serverURI}/api/task/cerca/${id}`)).pipe(
      catchError(this.handleError)
    )
  }

  public deleteTask(id: number){
    return this.http.delete<IApiMsg>((`https://${environment.serverURI}/api/task/rimozione/${id}`)).pipe(
      catchError(this.handleError)
    )
  }

  public createTask(task: any){
    return this.http.post<IApiMsg>((`https://${environment.serverURI}/api/task/inserimento`), task).pipe(
      catchError(this.handleError)
    )
  }

  public editTask(task: any){
    return this.http.put<IApiMsg>((`https://${environment.serverURI}/api/task/modifica`), task).pipe(
      catchError(this.handleError)
    )
  }

  public startTask(id: number){
    if(sessionStorage.getItem("CompletingTask") == null)
      sessionStorage.setItem("CompletingTask", JSON.stringify(id));
  }

  public getCompletingTask(){
    let task : string = "";
    var temp = sessionStorage.getItem("CompletingTask");

    if(temp != null){
      task = temp;
      return JSON.parse(task);
    }else{
      return null;
    }
  }

  public resetPendingTasks(){
    sessionStorage.removeItem('SpostamentoStarted');
    sessionStorage.removeItem('ConteggioStarted');
    sessionStorage.removeItem('SpedizioneStarted');
    sessionStorage.removeItem('RicezioneStarted');
    sessionStorage.removeItem('LastCode');
    sessionStorage.removeItem('Pallets');
  }

  public completeTask(){
    let id = this.getCompletingTask();
    this.removeCompletingTask();
    return this.http.put<IApiMsg>((`https://${environment.serverURI}/api/task/archivia/${id}`), id).pipe(
      catchError(this.handleError)
    )
  } 

  public removeCompletingTask(){
    sessionStorage.removeItem("CompletingTask");
  } 
}
