import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { SpedizioneService } from 'src/services/spedizione.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-spedizione-pallet',
  templateUrl: './spedizione-pallet.component.html',
  styleUrls: ['./spedizione-pallet.component.css']
})
export class SpedizionePalletComponent implements OnInit{
  bancali : any[] = [];
  task_id = -1;
  task : any = null;

  formData = new FormGroup({
    scelta: new FormControl('', Validators.required),
  });

  constructor(private route : ActivatedRoute, private router : Router, private taskService : TaskService, public spedizioneService : SpedizioneService, private bancaliService : BancaliService, private tokenService : TokenService){ }

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
          if(!this.spedizioneService.isStarted())
            this.spedizioneService.startSpedizione(this.task.bancaliTask);
        },
        error: (error) => {
          alert(error);
        }
      });
    }else{
      if(!this.spedizioneService.isStarted()){
        this.bancaliService.getAllPallets().subscribe({
          next: (response) => {
            this.spedizioneService.startSpedizione(response);
          },
          error: (error) => {
            alert(error);
          }
        })
      }
    }
  }

  removePallet(){
    let scelta = this.formData.get('scelta')?.value;
    let bancali : any[] = this.spedizioneService.getPallets();

    if(scelta == null || scelta == undefined)
      return;

    this.spedizioneService.removePallet(scelta).subscribe({
      next: (response : any) => {
        let bancale = bancali.find(b => b.bancale.numeroSeriale == scelta);
        let res = this.spedizioneService.removePalletSession(bancale);
        alert(response.messaggio);
        if(res == 0){
          this.spedizioneService.clearSpedizione();
          alert("Task completata. Ritornerai alla home.");
          this.taskService.completeTask().subscribe({
            next: (response) => {
              this.router.navigate(['/home']);
            },
            error: (error) => {
              alert(error);
              this.router.navigate(['/home']);
            }
          });
        }else{
          // location.reload();
        }
      },
      error: (error) => {
        alert(error);
      }
    });

  }

  removePalletCustom(){
    let scelta = this.formData.get('scelta')?.value;
    let bancali : any[] = this.spedizioneService.getPallets();

    if(scelta == null || scelta == undefined)
      return;

    this.spedizioneService.removePallet(scelta).subscribe({
      next: (response : any) => {
        let bancale = bancali.find(b => b.numeroSeriale == scelta);
        let res = this.spedizioneService.removeCustomPalletSession(bancale);
        alert(response.messaggio);
        if(res == 0){
          this.spedizioneService.clearSpedizione();
          alert("Non ci sono più bancali nel database. Ritornerai alla home.");
          this.router.navigate(['/home']);
        }else{
          // location.reload();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  terminaSpedizioneManuale(){
    this.spedizioneService.clearSpedizione();
    alert("Hai terminato la spedizione manuale. Ritornerai alla home.");
    this.router.navigate(['/home']);
  }
}
