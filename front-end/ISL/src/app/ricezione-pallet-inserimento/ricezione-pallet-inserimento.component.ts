import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AreaService } from 'src/services/area.service';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { RicezioneService } from 'src/services/ricezione.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-ricezione-pallet-inserimento',
  templateUrl: './ricezione-pallet-inserimento.component.html',
  styleUrls: ['./ricezione-pallet-inserimento.component.css']
})
export class RicezionePalletInserimentoComponent implements OnInit{
  areas : any;
  scaffali : any;
  posti : any;

  formData = new FormGroup({
    peso: new FormControl('', Validators.required),
    altezza: new FormControl('', Validators.required),
    lunghezza: new FormControl('', Validators.required),
    larghezza: new FormControl('', Validators.required),
    carico_speciale: new FormControl(''),
    data_scadenza: new FormControl(''),
    tipologia_carico: new FormControl(''),
    numero_lotto: new FormControl(''),
    mittente: new FormControl(''),
    codice_posto: new FormControl('', Validators.required),
    codice_scaffale: new FormControl('', Validators.required),
    codice_area: new FormControl('', Validators.required), 
  });

  constructor(private route : ActivatedRoute, private router : Router, private bancaliService : BancaliService, private ricezioneService : RicezioneService, private areaService : AreaService, private tokenService : TokenService){ }
  
  ngOnInit(): void {
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    
    this.areaService.getAllAreas().subscribe({
      next: (response : any) => {
        this.areas = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
      }
    });

    this.formData.get('codice_scaffale')?.disable();
    this.formData.get('codice_posto')?.disable();
  }

  retrieveScaffali(){
    if(this.formData.get('codice_area')?.value == null || this.formData.get('codice_area')?.value == "") return;
    this.formData.get('codice_scaffale')?.enable();
    let area = this.formData.get('codice_area')?.value;
    if(area == null || area == "") return;
    this.areaService.getScaffaliPerArea(area).subscribe({
      next: (response : any) => {
        this.scaffali = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codice_area')?.reset();
      }
    });
  }

  retrievePosti(){
    if(this.formData.get('codice_area')?.value == null 
      || this.formData.get('codice_scaffale')?.value == null
      || this.formData.get('codice_area')?.value == ""
      || this.formData.get('codice_scaffale')?.value == "") return;
    this.formData.get('codice_posto')?.enable();
    let area = this.formData.get('codice_area')?.value;
    let scaffale = this.formData.get('codice_scaffale')?.value;
    if(scaffale == null || scaffale == "") return;
    this.areaService.getPostiPerScaffale(area, scaffale).subscribe({
      next: (response : any) => {
        this.posti = response;
      },
      error: (error : HttpErrorResponse) => {
        alert(error);
        this.formData.get('codice_scaffale')?.reset();
        this.formData.get('codice_area')?.reset();
      }
    });
  }

  inserisciPallet(){
    let pallet = {
      NumeroSeriale: null,
      Peso: (this.formData.get('peso')?.value != "") ? this.formData.get('peso')?.value : null,
      Altezza: (this.formData.get('altezza')?.value != "") ? this.formData.get('altezza')?.value : null,
      Lunghezza: (this.formData.get('lunghezza')?.value != "") ? this.formData.get('lunghezza')?.value : null,
      Larghezza: (this.formData.get('larghezza')?.value != "") ? this.formData.get('larghezza')?.value : null,
      CaricoSpeciale: (this.formData.get('carico_speciale')?.value != "") ? this.formData.get('carico_speciale')?.value : false,
      DataScadenza: (this.formData.get('data_scadenza')?.value != "") ? this.formData.get('data_scadenza')?.value : null,
      TipologiaCarico: (this.formData.get('tipologia_carico')?.value != "") ? this.formData.get('tipologia_carico')?.value : null,
      NumeroLotto: (this.formData.get('numero_lotto')?.value != "") ? this.formData.get('numero_lotto')?.value : null,
      Mittente: (this.formData.get('mittente')?.value != "") ? this.formData.get('mittente')?.value : null,
      CodicePosto: this.formData.get('codice_posto')?.value,
      CodiceScaffale: this.formData.get('codice_scaffale')?.value,
      CodiceArea: this.formData.get('codice_area')?.value,
      CodiceMagazzino: "001"
    };
    this.ricezioneService.createPallet(pallet).subscribe({
          next: (response : any) => {
            console.log(response);
            // this.utente.dataNascita = new Date(this.utente.dataNascita).toLocaleDateString('it-IT');
            pallet.NumeroSeriale = response.messaggio.slice(24, 36);
            this.ricezioneService.saveCode(response.messaggio.slice(24, 36));
            this.ricezioneService.savePallet(pallet);
            console.log(this.bancaliService.bancali);
            alert("Inserimento avvenuto con successo!");
            this.router.navigate(['/ricezione/riepilogo']);
          },
          error: (error : HttpErrorResponse) => {
            alert(error);
          }
    });
  }
}
