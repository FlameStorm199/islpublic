import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { ConteggioService } from 'src/services/conteggio.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-conteggio-area',
  templateUrl: './conteggio-area.component.html',
  styleUrls: ['./conteggio-area.component.css']
})
export class ConteggioAreaComponent implements OnInit{
  public task_id : number = -1;
  public task : any;
  public QrString : string = "ciao";
  public spostamentoStarted : boolean = false;
  bancali : any[] = [];
  areas : any[] = [];
  area : string | null = null;
  areaDestinazione : string | null = null;
  bancaliConteggiati : any[] = [];
  scaffali : any[] = [];
  scaffaliTask : any;
  posti : any[] = [];

  formData = new FormGroup({
    scelta: new FormControl('', Validators.required)
  });

  formDataBancali : FormGroup = new FormGroup({});

  constructor(private route : ActivatedRoute, private router : Router, private taskService : TaskService, private conteggioService : ConteggioService, private areaService : AreaService, private bancaliService : BancaliService, private tokenService : TokenService){ }
  
  ngOnInit(): void {
    if(this.conteggioService.isStarted()){
      this.area = this.conteggioService.getArea();
    }

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
          console.log(this.task);
        },
        error: (error) => {
          alert(error);
        }
      });
    }else{
      this.areaService.getAllAreas().subscribe({
        next: (response) => {
          this.areas = response;
        },
        error: (error) => {
          alert(error);
        }
      })
    }

    if(this.conteggioService.isStarted())
      this.startConteggio();
  }

  gestisciScelta(){
    let scelta = this.formData.get('scelta')?.value;

    if(scelta == null || scelta == undefined || scelta == "")
      return;

    this.area = scelta;
    console.log(this.area);
  }

  startConteggio(){
    if(this.task_id != -1 && !this.conteggioService.isStarted())
      this.area = this.task.codiceAreaProvenienza;

    if(this.area == null) return;
    this.bancaliService.getPalletsByArea(this.area).subscribe({
      next: (response) => {
        this.bancali = response;
        this.formDataBancali = new FormGroup({});
        for (let i = 0; i < this.bancali.length; i++) {
          this.formDataBancali.addControl(
              this.bancali[i].numeroSeriale, new FormControl(false)
          )
        }
        this.conteggioService.startConteggio(this.bancali, this.area);
      },
      error: (error) => {
        alert(error);
      }
    })
    this.conteggioService.startConteggio(this.bancali, this.area);
  }

  search(bancale : any, event : any){
    var index = this.bancaliConteggiati.indexOf(bancale.numeroSeriale);
    if (event.target.checked) {
      if (index === -1) {
        this.bancaliConteggiati.push(bancale.numeroSeriale);
      }
    } else {
      if (index !== -1) {
        this.bancaliConteggiati.splice(index, 1);
      }
    }
  }

  isStarted(){
    return this.conteggioService.isStarted();
  }

  async completaConteggio(){
    for(let i = 0; i < this.bancali.length; i++){
      if(!this.bancaliConteggiati.includes(this.bancali[i].numeroSeriale))
        await firstValueFrom(this.conteggioService.rimuoviBancale(this.bancali[i].numeroSeriale));
    }
    this.terminaConteggio();
  }

  terminaConteggio(){
    this.conteggioService.stopConteggio();
    alert("Conteggio completato con successo!");
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
    }else{
      this.router.navigate(['/home']);
    }
  }
}
