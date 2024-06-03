import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/models/ITask';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tasks : any;

  constructor(private router : Router, private taskService : TaskService, private tokenService : TokenService){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    this.taskService.getTasks().subscribe({
          next: (response) => {
            this.tasks = response;
            // this.utente.dataNascita = new Date(this.utente.dataNascita).toLocaleDateString('it-IT');
          },
          error: (error) => {
            alert(error);
            this.tokenService.clearAll();
            this.router.navigate(['']);
          }
    });
  }

  effettuaOperazione(action : string){
    this.router.navigate([action]);
  }


}
