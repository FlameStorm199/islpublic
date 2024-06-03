import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { SpostamentoService } from 'src/services/spostamento.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-spostamento-area',
  templateUrl: './spostamento-area.component.html',
  styleUrls: ['./spostamento-area.component.css']
})
export class SpostamentoAreaComponent implements OnInit{
  public task_id : number = -1;
  public task : any;
  public QrString : string = "ciao";
  public spostamentoStarted : boolean = false;
  bancali : any[] = [];
  areas : any[] = [];
  area : string | null = null;
  areaDestinazione : string | null = null;
  bancaliSelezionati : any[] = [];
  scaffali : any[][] = [];
  scaffaliTask : any;
  posti : any[][] = [];

  formData = new FormGroup({
    scelta: new FormControl('', Validators.required)
  });

  formDataBancali : FormGroup = new FormGroup({});

  constructor(private route : ActivatedRoute, private router : Router, private taskService : TaskService, private spostamentoService : SpostamentoService, private areaService : AreaService, private bancaliService : BancaliService, private tokenService : TokenService){ }
  
  ngOnInit(): void {
    // if(this.spostamentoService.isStarted()){
    //   this.area = this.spostamentoService.getArea();
    //   this.bancali = this.spostamentoService.getPallets();
    //   if(this.taskService.getCompletingTask() == null){
    //     this.bancali.forEach(b => {this.posti[b.numeroSeriale] = []});
    //     this.bancali.forEach(b => {this.scaffali[b.numeroSeriale] = []});
    //   }else
    //     this.bancali.forEach(b => {this.posti[b.bancale.numeroSeriale] = []});
    // }

    this.spostamentoService.stopSpostamento();

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
  }

  gestisciScelta(){
    let scelta = this.formData.get('scelta')?.value;

    if(scelta == null || scelta == undefined || scelta == "")
      return;

    this.area = scelta;
    console.log(this.area);
  }

  startSpostamento(){
    if(this.task_id != -1)
      this.area = this.task.codiceAreaProvenienza;
    if(this.task_id == -1){
      if(this.area != null){
        this.bancaliService.getPalletsByArea(this.area).subscribe({
          next: (response) => {
            this.bancali = response;
            this.bancali.forEach(b => {this.scaffali[b.numeroSeriale] = []});
            this.bancali.forEach(b => {this.posti[b.numeroSeriale] = []});
            this.formDataBancali = new FormGroup({});
            for (let i = 0; i < this.bancali.length; i++) {
              this.formDataBancali.addControl(
                  this.bancali[i].numeroSeriale, new FormControl(false)
              )
              this.formDataBancali.addControl(
                  `codice_area/${this.bancali[i].numeroSeriale}`, new FormControl()
              )
              this.formDataBancali.get(`codice_area/${this.bancali[i].numeroSeriale}`)?.disable();
              this.formDataBancali.addControl(
                  `codice_scaffale/${this.bancali[i].numeroSeriale}`, new FormControl()
              )
              this.formDataBancali.get(`codice_scaffale/${this.bancali[i].numeroSeriale}`)?.disable();
              this.formDataBancali.addControl(
                  `codice_posto/${this.bancali[i].numeroSeriale}`, new FormControl()
              )
              this.formDataBancali.get(`codice_posto/${this.bancali[i].numeroSeriale}`)?.disable();
            }
            this.spostamentoService.startSpostamento(this.bancali, this.area);
          },
          error: (error) => {
            alert(error);
          }
        })
      }
    }else{
      this.bancali = this.task.bancaliTask
      for(let i = 0; i < this.bancali.length; i++){
        this.formDataBancali.addControl(
            `codice_scaffale/${this.bancali[i].bancale.numeroSeriale}`, new FormControl()
        )
        this.formDataBancali.addControl(
            `codice_posto/${this.bancali[i].bancale.numeroSeriale}`, new FormControl()
        )
        this.formDataBancali.get(`codice_posto/${this.bancali[i].bancale.numeroSeriale}`)?.disable();
        this.bancaliSelezionati.push(this.bancali[i].bancale.numeroSeriale);
      }
      this.bancali.forEach(b => {this.posti[b.bancale.numeroSeriale] = []});
      this.retrieveScaffaliTask();
      this.spostamentoService.startSpostamento(this.bancali, this.area);
    }
  }

  search(bancale : any, event : any){
    var index = this.bancaliSelezionati.indexOf(bancale.numeroSeriale);
    if (event.target.checked) {
      if (index === -1) {
        this.bancaliSelezionati.push(bancale.numeroSeriale);
        this.formDataBancali.get(`codice_area/${bancale.numeroSeriale}`)?.enable();
      }
    } else {
      if (index !== -1) {
        this.bancaliSelezionati.splice(index, 1);
        this.formDataBancali.get(`codice_area/${bancale.numeroSeriale}`)?.disable();
        this.formDataBancali.get(`codice_scaffale/${bancale.numeroSeriale}`)?.disable();
        this.formDataBancali.get(`codice_posto/${bancale.numeroSeriale}`)?.disable();
      }
    }
  }

  isStarted(){
    return this.spostamentoService.isStarted();
  }

  retrieveScaffali(numero_seriale : any){
    if(this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value == null || this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value == "") return;
    this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.enable();
    let area = this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value;
    if(area == null || area == "") return;
    this.areaService.getScaffaliPerArea(area).subscribe({
      next: (response : any) => {
        this.scaffali[numero_seriale] = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formDataBancali.get(`codice_area/${numero_seriale}`)?.reset();
      }
    });
  }

  retrieveScaffaliTask(){
    let area = this.task.codiceAreaDestinazione;
    if(area == null || area == "") return;
    this.areaService.getScaffaliPerArea(area).subscribe({
      next: (response : any) => {
        this.scaffaliTask = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
      }
    });
  }

  retrievePosti(numero_seriale : any){
    if(this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value == null 
      || this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value == null
      || this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value == ""
      || this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value == "") return;
    this.formDataBancali.get(`codice_posto/${numero_seriale}`)?.enable();
    let area = this.formDataBancali.get(`codice_area/${numero_seriale}`)?.value;
    let scaffale = this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value;
    if(scaffale == null || scaffale == "") return;
    this.areaService.getPostiPerScaffale(area, scaffale).subscribe({
      next: (response : any) => {
        this.posti[numero_seriale] = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.reset();
        this.formDataBancali.get(`codice_area/${numero_seriale}`)?.reset();
      }
    });
  }

  retrievePostiTask(numero_seriale : any){
    if(this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value == null
      || this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value == "") return;
    this.formDataBancali.get(`codice_posto/${numero_seriale}`)?.enable();
    let area = this.task.codiceAreaDestinazione;
    let scaffale = this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.value;
    if(scaffale == null || scaffale == "") return;
    this.areaService.getPostiPerScaffale(area, scaffale).subscribe({
      next: (response : any) => {
        this.posti[numero_seriale] = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formDataBancali.get(`codice_scaffale/${numero_seriale}`)?.reset();
      }
    });
  }

  async completaSpostamento(){
    let codice_area = null;
    for(let i = 0; i < this.bancaliSelezionati.length; i++){
      if(this.task_id == -1){
        codice_area = this.formDataBancali.get(`codice_area/${this.bancaliSelezionati[i]}`)?.value;
      }else{
        codice_area = this.task.codiceAreaDestinazione;
      }
      let codice_scaffale = this.formDataBancali.get(`codice_scaffale/${this.bancaliSelezionati[i]}`)?.value;
      let codice_posto = this.formDataBancali.get(`codice_posto/${this.bancaliSelezionati[i]}`)?.value;
      if(codice_area == null || codice_area == undefined || codice_area == ""
        || codice_scaffale == null || codice_scaffale == undefined || codice_scaffale == ""
        || codice_posto == null || codice_posto == undefined || codice_posto == ""
      ){
        alert("Selezionare il posto di destinazione di tutti i bancali");
        return;
      }
      else{
        let bancale = null;
        if(this.task_id == -1)
          bancale = this.bancali.find(b2 => b2.numeroSeriale == this.bancaliSelezionati[i]);
        else
          bancale = this.bancali.find(b2 => b2.bancale.numeroSeriale == this.bancaliSelezionati[i]).bancale;
        
        bancale.codiceArea = codice_area;
        bancale.codiceScaffale = codice_scaffale;
        bancale.codicePosto = codice_posto;
        try{
          let response = await firstValueFrom(this.spostamentoService.spostaBancale(bancale));
        }catch(Exception){
          return;
        }
        
      }  
    }
    this.terminaSpostamento();
  }

  async spostaBancale(bancale : any){
    this.spostamentoService.spostaBancale(bancale).subscribe({
      next: (response : any) => {
        if(response != undefined)
          return response;
      },
      error: (error : HttpErrorResponse) => {
        
      }
    });
  }

  terminaSpostamento(){
    this.spostamentoService.stopSpostamento();
    alert("Spostamento completato con successo!");
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
