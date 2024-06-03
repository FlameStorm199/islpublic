import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-scaffale',
  templateUrl: './scaffale.component.html',
  styleUrls: ['./scaffale.component.css']
})
export class ScaffaleComponent implements OnInit{
  scaffale : any;
  posti : any[] = [];

  constructor(private service : AreaService, private route : ActivatedRoute, private taskService : TaskService, private tokenService : TokenService, private router : Router){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      let temp = params.get('idArea');
      let temp2 = params.get('idScaffale');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined"
          && temp2 != null && temp2 != undefined && temp2 != ""  && temp2 != "null" && temp2 != "undefined"){
        let idArea = temp;
        let idScaffale = temp2;
        this.service.getAllAreas().subscribe({
          next: (response) => {
            let area = response.find(a => a.codiceArea == idArea);
            if(area == null)
              this.router.navigate(['home']);
            this.service.getScaffaliPerArea(idArea).subscribe({
              next: (response) => {
                this.scaffale = response.find(s => s.codiceScaffale == idScaffale);
                if(this.scaffale == null)
                  this.router.navigate(['home']);
                this.service.getPostiPerScaffale(idArea, idScaffale).subscribe({
                  next: (response) => {
                    this.posti = response;
                  },
                  error: (error) => {
                    alert(error);                    
                  }
                })
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
        // this.router.navigate(['home']);
      }
    });
  }
}
