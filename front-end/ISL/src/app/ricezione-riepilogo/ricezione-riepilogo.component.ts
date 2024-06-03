import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { RicezioneService } from 'src/services/ricezione.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-ricezione-riepilogo',
  templateUrl: './ricezione-riepilogo.component.html',
  styleUrls: ['./ricezione-riepilogo.component.css']
})
export class RicezioneRiepilogoComponent implements OnInit{
  public codiceBancale : string | null = "";
  public bancali : any[] = [];

  constructor(private router : Router, private ricezioneService : RicezioneService, private taskService : TaskService, private tokenService : TokenService){ }

  ngOnInit(): void {
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.codiceBancale = this.ricezioneService.getLastCode();
    this.bancali = this.ricezioneService.getPallets();
    console.log(this.bancali);
  }

  terminaRicezione(){
    this.ricezioneService.clearCodeAndPallets();
    alert("Hai terminato la ricezione! ");
    this.router.navigate(['/home']);
    if(this.taskService.getCompletingTask() != null){
      alert("Hai anche completato la task n. "+this.taskService.getCompletingTask());
      this.taskService.completeTask().subscribe({
        next: (response : any) => {
          this.router.navigate(['/home']);
        },
        error: (error : HttpErrorResponse) => {
          alert(error);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  inserisciNuovoPallet(){
    if(this.taskService.getCompletingTask() != null)
      this.router.navigate(['/ricezione/pallet', this.taskService.getCompletingTask(), 'inserimento'])
    else
      this.router.navigate(['/ricezione/pallet', 'custom', 'inserimento'])
  }
}
