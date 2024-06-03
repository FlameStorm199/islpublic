import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { RicezioneService } from 'src/services/ricezione.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.component.html',
  styleUrls: ['./modifica-utente.component.css']
})
export class ModificaUtenteComponent implements OnInit{
  users: any[] = [];
  magazzini : any[] = [];
  username : string = "";
  modifica : boolean = true;
  user : any;

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
    
    this.areaService.getAllWarehouses().subscribe({
      next: (response : any) => {
        this.magazzini = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let temp = params.get('username');
      if(temp != null && temp != undefined && temp != ""  && temp != "null" && temp != "undefined"){
        if(temp == "aggiunta"){
          this.modifica = false;
          this.formData.addControl('username', new FormControl('', Validators.required));
          this.formData.addControl('password', new FormControl('', Validators.required));
          this.formData.addControl('nome', new FormControl('', Validators.required));
          this.formData.addControl('cognome', new FormControl('', Validators.required));
          this.formData.addControl('dataNascita', new FormControl(''));
          this.formData.addControl('luogoNascita', new FormControl(''));
          this.formData.addControl('telefono', new FormControl(''));
          this.formData.addControl('magazzino', new FormControl('', Validators.required));
        }
        else{
          this.username = temp;
          this.userService.retrieveUserData(this.username).subscribe({
            next: (response) => {
              this.user = response;
              this.formData.addControl('username', new FormControl(this.user.username, Validators.required));
              this.formData.addControl('password', new FormControl('', Validators.required));
              this.formData.addControl('nome', new FormControl(this.user.nome, Validators.required));
              this.formData.addControl('cognome', new FormControl(this.user.cognome, Validators.required));
              this.formData.addControl('dataNascita', new FormControl(new Date(this.user.dataNascita).toLocaleDateString('it-IT')));
              this.formData.addControl('luogoNascita', new FormControl(this.user.luogoNascita));
              this.formData.addControl('telefono', new FormControl(this.user.telefono));
              this.formData.addControl('magazzino', new FormControl(this.user.magazzino, Validators.required));
              console.log(this.user);
            },
            error: (error) => {
              alert(error);
            }
          })
        }
      }
    });
  }

  modificaUtente(){
    let utente = {
      Username: (this.formData.get('username')?.value != "") ? this.formData.get('username')?.value : null,
      Password: (this.formData.get('password')?.value != "") ? this.formData.get('password')?.value : null,
      Nome: (this.formData.get('nome')?.value != "") ? this.formData.get('nome')?.value : null,
      Cognome: (this.formData.get('cognome')?.value != "") ? this.formData.get('cognome')?.value : null,
      DataNascita: (this.formData.get('dataNascita')?.value != "") ? this.formData.get('dataNascita')?.value : null,
      LuogoNascita: (this.formData.get('luogoNascita')?.value != "") ? this.formData.get('luogoNascita')?.value : null,
      Telefono: (this.formData.get('telefono')?.value != "") ? this.formData.get('telefono')?.value : null,
      CodiceMagazzino: (this.formData.get('magazzino')?.value != "") ? this.formData.get('magazzino')?.value : null
    };
    this.userService.editUser(utente).subscribe({
      next: (response) => {
        alert(response.messaggio);
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  aggiungiUtente(){
    let utente = {
      Username: (this.formData.get('username')?.value != "") ? this.formData.get('username')?.value : null,
      Password: (this.formData.get('password')?.value != "") ? this.formData.get('password')?.value : null,
      Nome: (this.formData.get('nome')?.value != "") ? this.formData.get('nome')?.value : null,
      Cognome: (this.formData.get('cognome')?.value != "") ? this.formData.get('cognome')?.value : null,
      DataNascita: (this.formData.get('dataNascita')?.value != "") ? this.formData.get('dataNascita')?.value : null,
      LuogoNascita: (this.formData.get('luogoNascita')?.value != "") ? this.formData.get('luogoNascita')?.value : null,
      Telefono: (this.formData.get('telefono')?.value != "") ? this.formData.get('telefono')?.value : null,
      CodiceMagazzino: (this.formData.get('magazzino')?.value != "") ? this.formData.get('magazzino')?.value : null
    };
    this.userService.addUser(utente).subscribe({
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
