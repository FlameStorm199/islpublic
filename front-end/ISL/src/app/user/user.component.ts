import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IUtente } from 'src/models/IUtente';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  public utente : IUtente | any;
  public username : string | null = null;

  constructor(private service : UserService, private route : ActivatedRoute, private router : Router, private tokenService : TokenService, private taskService : TaskService){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
      if(this.username != null && this.username != undefined && this.username != "" && this.username != "null"){
        this.service.retrieveUserData(this.username).subscribe({
          next: (response : IUtente) => {
            console.log(response);
            this.utente = response;
          },
          error: (error) => {
            alert(error);
            this.tokenService.clearAll();
            this.router.navigate(['']);
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    });
    this.username = this.tokenService.getLoggedUser();
  }

  logout(){
    this.tokenService.clearAll();
    this.router.navigate(['']);
  }
}
