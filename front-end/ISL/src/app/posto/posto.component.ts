import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-posto',
  templateUrl: './posto.component.html',
  styleUrls: ['./posto.component.css']
})
export class PostoComponent implements OnInit {
  posto : any;
  bancale : any;

  constructor(private service : AreaService, private route : ActivatedRoute, private router : Router, private taskService : TaskService, private tokenService : TokenService){ }

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
      let temp3 = params.get('idPosto');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined"
          && temp2 != null && temp2 != undefined && temp2 != ""  && temp2 != "null" && temp2 != "undefined"
          && temp3 != null && temp3 != undefined && temp3 != ""  && temp3 != "null" && temp3 != "undefined"){
        let idArea = temp;
        let idScaffale = temp2;
        let idPosto = temp3;
        this.service.getAllAreas().subscribe({
          next: (response) => {
            let area = response.find(a => a.codiceArea == idArea);
            if(area == null)
              this.router.navigate(['home']);
            this.service.getScaffaliPerArea(idArea).subscribe({
              next: (response) => {
                let scaffale = response.find(s => s.codiceScaffale == idScaffale);
                if(scaffale == null)
                  this.router.navigate(['home']);
                this.service.getPostiPerScaffale(idArea, idScaffale).subscribe({
                  next: (response) => {
                    this.posto = response.find(p => p.codicePosto == idPosto);
                    this.service.getBancalePerPosto(idArea, idScaffale, idPosto).subscribe({
                      next: (response) => {
                        this.bancale = response;
                      },
                      error: (error) => {
                        if(error != "Error: Nessun bancale nel posto indicato. (Codice 404: Not Found)")
                          alert(error);
                      }
                    })
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
