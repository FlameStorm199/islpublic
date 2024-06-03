import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-spedizione',
  templateUrl: './spostamento.component.html',
  styleUrls: ['./spostamento.component.css']
})
export class SpostamentoComponent implements OnInit{
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
            this.tasks = response.filter(r => r.tipologia == "SPOSTAMENTO");
            console.log(this.tasks);
          },
          error: (error) => {
            alert(error);
          }
    });
  }
}
