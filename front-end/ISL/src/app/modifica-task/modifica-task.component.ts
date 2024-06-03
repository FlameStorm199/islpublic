import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-modifica-task',
  templateUrl: './modifica-task.component.html',
  styleUrls: ['./modifica-task.component.css']
})
export class ModificaTaskComponent implements OnInit{
  tasks: any[] = [];
  magazzini : any[] = [];
  task_id : number = 0;
  modifica : boolean = true;
  task : any;
  scaffaliProvenienza : any[] = [];
  scaffaliDestinazione : any[] = [];
  postiProvenienza : any[] = [];
  postiDestinazione : any[] = [];
  areas : any[] = [];

  formData = new FormGroup({
    
  });

  constructor(private route : ActivatedRoute, private router : Router, private userService : UserService, private areaService : AreaService, private tokenService : TokenService, private taskService : TaskService){ }
  
  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    console.log(this.tokenService.isLogged());
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      let temp = params.get('username');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined" && parseInt(temp) != null){
        if(temp == "aggiunta"){
          this.modifica = false;
          this.formData.addControl('codiceAreaProvenienza', new FormControl('', Validators.required));
          this.formData.addControl('codiceScaffaleProvenienza', new FormControl(''));
          this.formData.addControl('codicePostoProvenienza', new FormControl(''));
          this.formData.addControl('codiceAreaDestinazione', new FormControl(''));
          this.formData.addControl('codiceScaffaleDestinazione', new FormControl(''));
          this.formData.addControl('codicePostoDestinazione', new FormControl(''));
          this.formData.addControl('dataOraScadenza', new FormControl(''));
          this.formData.addControl('descrizione', new FormControl(''));
          this.formData.addControl('infoUlteriori', new FormControl(''));
          this.formData.addControl('nome', new FormControl('', Validators.required));
          this.formData.addControl('tipologia', new FormControl('', Validators.required));
          this.formData.addControl('urgenza', new FormControl('', Validators.required));
        }
        else{
          this.task_id = parseInt(temp);
          this.taskService.retrieveTask(this.task_id).subscribe({
            next: (response) => {
              this.task = response;
              this.formData.addControl('codiceAreaProvenienza', new FormControl(this.task.codiceAreaProvenienza, Validators.required));
              this.formData.addControl('codiceScaffaleProvenienza', new FormControl(this.task.codiceScaffaleProvenienza));
              this.formData.addControl('codicePostoProvenienza', new FormControl(this.task.codicePostoProvenienza));
              this.formData.addControl('codiceAreaDestinazione', new FormControl(this.task.codiceAreaDestinazione));
              this.formData.addControl('codiceScaffaleDestinazione', new FormControl(this.task.codiceScaffaleDestinazione));
              this.formData.addControl('codicePostoDestinazione', new FormControl(this.task.codicePostoDestinazione));
              this.formData.addControl('dataOraScadenza', new FormControl(this.task.dataOraScadenza));
              this.formData.addControl('descrizione', new FormControl(this.task.descrizione));
              this.formData.addControl('infoUlteriori', new FormControl(this.task.infoUlteriori));
              this.formData.addControl('nome', new FormControl(this.task.nome, Validators.required));
              this.formData.addControl('tipologia', new FormControl(this.task.tipologia, Validators.required));
              this.formData.addControl('urgenza', new FormControl(this.task.urgenza, Validators.required));
              console.log(this.task);
            },
            error: (error) => {
              alert(error);
            }
          })
        }
      }
    });

    this.areaService.getAllAreas().subscribe({
      next: (response) => {
        this.areas = response;
      },
      error: (error) => {
        alert(error);
      }
    });
    this.formData.get('codiceScaffaleProvenienza')?.disable();
    this.formData.get('codiceScaffaleDestinazione')?.disable();
    this.formData.get('codicePostoProvenienza')?.disable();
    this.formData.get('codicePostoDestinazione')?.disable();
  }

  retrieveScaffaliProvenienza(){
    if(this.formData.get('codiceAreaProvenienza')?.value == null || this.formData.get('codiceAreaProvenienza')?.value == "") return;
    this.formData.get('codiceScaffaleProvenienza')?.enable();
    let area = this.formData.get('codiceAreaProvenienza')?.value;
    if(area == null || area == "") return;
    this.areaService.getScaffaliPerArea(area).subscribe({
      next: (response : any) => {
        this.scaffaliProvenienza = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codiceAreaProvenienza')?.reset();
      }
    });
  }

  retrieveScaffaliDestinazione(){
    if(this.formData.get('codiceAreaDestinazione')?.value == null || this.formData.get('codiceAreaDestinazione')?.value == "") return;
    this.formData.get('codiceScaffaleDestinazione')?.enable();
    let area = this.formData.get('codiceAreaDestinazione')?.value;
    if(area == null || area == "") return;
    this.areaService.getScaffaliPerArea(area).subscribe({
      next: (response : any) => {
        this.scaffaliDestinazione = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codiceAreaDestinazione')?.reset();
      }
    });
  }

  retrievePostiProvenienza(){
    if(this.formData.get('codiceAreaProvenienza')?.value == null 
      || this.formData.get('codiceScaffaleProvenienza')?.value == null
      || this.formData.get('codiceAreaProvenienza')?.value == ""
      || this.formData.get('codiceScaffaleProvenienza')?.value == "") return;
    this.formData.get('codicePostoProvenienza')?.enable();
    let area = this.formData.get('codiceAreaProvenienza')?.value;
    let scaffale = this.formData.get('codiceScaffaleProvenienza')?.value;
    if(scaffale == null || scaffale == "") return;
    this.areaService.getPostiPerScaffale(area, scaffale).subscribe({
      next: (response : any) => {
        this.postiProvenienza = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codiceScaffaleProvenienza')?.reset();
        this.formData.get('codiceAreaProvenienza')?.reset();
      }
    });
  }

  retrievePostiDestinazione(){
    if(this.formData.get('codiceAreaDestinazione')?.value == null 
      || this.formData.get('codiceScaffaleDestinazione')?.value == null
      || this.formData.get('codiceAreaDestinazione')?.value == ""
      || this.formData.get('codiceScaffaleDestinazione')?.value == "") return;
    this.formData.get('codicePostoDestinazione')?.enable();
    let area = this.formData.get('codiceAreaDestinazione')?.value;
    let scaffale = this.formData.get('codiceScaffaleDestinazione')?.value;
    if(scaffale == null || scaffale == "") return;
    this.areaService.getPostiPerScaffale(area, scaffale).subscribe({
      next: (response : any) => {
        this.postiDestinazione = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codiceScaffaleDestinazione')?.reset();
        this.formData.get('codiceAreaDestinazione')?.reset();
      }
    });
  }

  modificaAggiungiTask(){
    if(this.modifica == true)
      this.modificaTask();
    else
      this.aggiungiTask();
  }

  modificaTask(){
    let task = {
      CodiceAreaProvenienza: (this.formData.get('codiceAreaProvenienza')?.value != "") ? this.formData.get('codiceAreaProvenienza')?.value : null,
      CodiceScaffaleProvenienza: (this.formData.get('codiceScaffaleProvenienza')?.value != "") ? this.formData.get('codiceScaffaleProvenienza')?.value : null,
      CodicePostoProvenienza: (this.formData.get('codicePostoProvenienza')?.value != "") ? this.formData.get('codicePostoProvenienza')?.value : null,
      CodiceAreaDestinazione: (this.formData.get('codiceAreaDestinazione')?.value != "") ? this.formData.get('codiceAreaDestinazione')?.value : null,
      CodiceScaffaleDestinazione: (this.formData.get('codiceScaffaleDestinazione')?.value != "") ? this.formData.get('codiceScaffaleDestinazione')?.value : null,
      CodicePostoDestinazione: (this.formData.get('codicePostoDestinazione')?.value != "") ? this.formData.get('codicePostoDestinazione')?.value : null,
      DataOraScadenza: (this.formData.get('dataOraScadenza')?.value != "") ? this.formData.get('dataOraScadenza')?.value : null,
      Descrizione: (this.formData.get('descrizione')?.value != "") ? this.formData.get('descrizione')?.value : null,
      InfoUlteriori: (this.formData.get('infoUlteriori')?.value != "") ? this.formData.get('infoUlteriori')?.value : null,
      Nome: (this.formData.get('nome')?.value != "") ? this.formData.get('nome')?.value : null,
      Tipologia: (this.formData.get('tipologia')?.value != "") ? this.formData.get('tipologia')?.value : null,
      Urgenza: (this.formData.get('urgenza')?.value != "") ? this.formData.get('urgenza')?.value : null,
      CodiceMagazzinoProvenienza: '001',
      CodiceMagazzinoDestinazione: '001',
      Status: 1,
      DataOraCompletamento: null,
      id: this.task.id
    };

    this.taskService.editTask(task).subscribe({
      next: (response) => {
        alert(response.messaggio);
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert(error);
      }
    });
    
  }

  aggiungiTask(){
    let task = {
      CodiceAreaProvenienza: (this.formData.get('codiceAreaProvenienza')?.value != "") ? this.formData.get('codiceAreaProvenienza')?.value : null,
      CodiceScaffaleProvenienza: (this.formData.get('codiceScaffaleProvenienza')?.value != "") ? this.formData.get('codiceScaffaleProvenienza')?.value : null,
      CodicePostoProvenienza: (this.formData.get('codicePostoProvenienza')?.value != "") ? this.formData.get('codicePostoProvenienza')?.value : null,
      CodiceAreaDestinazione: (this.formData.get('codiceAreaDestinazione')?.value != "") ? this.formData.get('codiceAreaDestinazione')?.value : null,
      CodiceScaffaleDestinazione: (this.formData.get('codiceScaffaleDestinazione')?.value != "") ? this.formData.get('codiceScaffaleDestinazione')?.value : null,
      CodicePostoDestinazione: (this.formData.get('codicePostoDestinazione')?.value != "") ? this.formData.get('codicePostoDestinazione')?.value : null,
      DataOraScadenza: (this.formData.get('dataOraScadenza')?.value != "") ? this.formData.get('dataOraScadenza')?.value : null,
      Descrizione: (this.formData.get('descrizione')?.value != "") ? this.formData.get('descrizione')?.value : null,
      InfoUlteriori: (this.formData.get('infoUlteriori')?.value != "") ? this.formData.get('infoUlteriori')?.value : null,
      Nome: (this.formData.get('nome')?.value != "") ? this.formData.get('nome')?.value : null,
      Tipologia: (this.formData.get('tipologia')?.value != "") ? this.formData.get('tipologia')?.value : null,
      Urgenza: (this.formData.get('urgenza')?.value != "") ? this.formData.get('urgenza')?.value : null,
      CodiceMagazzinoProvenienza: '001',
      CodiceMagazzinoDestinazione: '001',
      Status: 1,
      DataOraCompletamento: null
    };

    this.taskService.createTask(task).subscribe({
      next: (response) => {
        alert(response.messaggio);
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert(error);
      }
    });
    
  }
}
