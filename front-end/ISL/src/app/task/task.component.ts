import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  task : any = {};

  constructor(private service : TaskService, private route : ActivatedRoute, private router : Router, private tokenService : TokenService){ }

  ngOnInit(): void {
    this.service.removeCompletingTask();
    this.service.resetPendingTasks();
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let temp = params.get('id');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined" && parseInt(temp) != null){
        let id = parseInt(temp);
        this.service.retrieveTask(id).subscribe({
          next: (response) => {
            this.task = response;
            if(this.task == null)
              this.router.navigate(['home']);
          },
          error: (error) => {
            alert(error);
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}
