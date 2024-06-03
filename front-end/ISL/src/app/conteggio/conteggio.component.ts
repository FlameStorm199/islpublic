import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-conteggio',
  templateUrl: './conteggio.component.html',
  styleUrls: ['./conteggio.component.css']
})
export class ConteggioComponent implements OnInit {
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
            this.tasks = response.filter(r => r.tipologia == "CONTEGGIO");
            console.log(this.tasks);
            // this.utente.dataNascita = new Date(this.utente.dataNascita).toLocaleDateString('it-IT');
          },
          error: (error) => {
            alert(error);
          }
    });
  }
}
