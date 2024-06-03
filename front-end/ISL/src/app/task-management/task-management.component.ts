import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit{
  tasks : any[] = [];
  filteredTasks : any[] = [];

  formData = new FormGroup({
    cerca: new FormControl('')
  })

  constructor(private taskService : TaskService, private tokenService : TokenService, private router : Router, private userService: UserService){ }

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
        this.filteredTasks = this.tasks;
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  filterTasks(){
    let cerca = this.formData.get('cerca')?.value;
    console.log(this.tasks);
    if(cerca != null && cerca != undefined)
      this.filteredTasks = this.tasks.filter(t => t.nome.toLowerCase().includes(cerca?.toLowerCase()));
  }

  creaTask(){
    this.router.navigate(['admin/task/modifiche/aggiunta'])
  }

  modificaTask(id : any){
    this.router.navigate(['admin/task/modifiche', id]);
  }

  rimuoviTask(id : any){
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        alert(response.messaggio);
        window.location.reload();
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
