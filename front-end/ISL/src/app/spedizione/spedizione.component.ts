import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-spedizione',
  templateUrl: './spedizione.component.html',
  styleUrls: ['./spedizione.component.css']
})
export class SpedizioneComponent implements OnInit{
  tasks : any;

  constructor(private taskService : TaskService, private tokenService : TokenService, private router : Router){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();

    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.taskService.getTasks().subscribe({
          next: (response) => {
            this.tasks = response.filter(r => r.tipologia == "SPEDIZIONE");
            console.log(this.tasks);
            // this.utente.dataNascita = new Date(this.utente.dataNascita).toLocaleDateString('it-IT');
          },
          error: (error) => {
            alert(error);
          }
    });
  }
}
