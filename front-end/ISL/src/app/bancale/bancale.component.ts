import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { BancaliService } from 'src/services/bancali.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-bancale',
  templateUrl: './bancale.component.html',
  styleUrls: ['./bancale.component.css']
})
export class BancaleComponent implements OnInit{
  bancale : any = {};

  constructor(private service : BancaliService, private route : ActivatedRoute, private router : Router, private taskService : TaskService, private tokenService : TokenService){ }

  ngOnInit(): void {
    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if(id != null && id != undefined && id != ""  && id != "null" && id != "undefined"){
        this.service.retrievePallet(id).subscribe({
          next: (response) => {
            this.bancale = response;
            // this.bancale.dataScadenza = formatDate(new Date(this.bancale.dataScadenza), 'dd-MM-yyyy hh:mm:ssZZZZZ', 'it-IT');
          },
          error: (error) => {
            alert(error);
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    });
  }

}
