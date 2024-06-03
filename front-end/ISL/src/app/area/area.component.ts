import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit{
  area : any;
  scaffali : any[] = [];

  constructor(private service : AreaService, private route : ActivatedRoute, private router : Router, private taskService : TaskService, private tokenService : TokenService){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let temp = params.get('id');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined"){
        let id = temp;
        this.service.getAllAreas().subscribe({
          next: (response) => {
            this.area = response.find(a => a.codiceArea == id);
            if(this.area == null)
              this.router.navigate(['home']);
            this.service.getScaffaliPerArea(id).subscribe({
              next: (response) => {
                this.scaffali = response;
              },
              error: (error) => {
                alert(error);
              }
            });
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
