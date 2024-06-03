import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
// import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-ricezione-pallet',
  templateUrl: './ricezione-pallet.component.html',
  styleUrls: ['./ricezione-pallet.component.css']
})
export class RicezionePalletComponent implements OnInit{

  public task_id : number = -1;
  public task : any;
  public QrString : string = "ciao";

  constructor(private route : ActivatedRoute, private router : Router, private taskService : TaskService, private tokenService : TokenService){ }
  
  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();

    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if(id == 'null' || id == 'undefined' || id == null || id == undefined){
        this.router.navigate(['/home']);
      }

      if(id != "custom" && id != null)
        this.task_id = parseInt(id);

    });

    if(this.task_id != -1){
      this.taskService.retrieveTask(this.task_id).subscribe({
        next: (response) => {
          this.task = response;
          this.taskService.startTask(this.task_id);
        },
        error: (error) => {
          alert(error);
        }
      });
    }
  }
}
