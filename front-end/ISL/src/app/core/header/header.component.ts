import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public currentRoute: string = "";
  public user : string | null = "";

  constructor(public tokenService : TokenService, private router : Router){ }

  ngOnInit(): void {
  }

  apriAreaUtente(){
    this.user = this.tokenService.getLoggedUser();
    if(this.user == null || this.user == ""){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    this.router.navigate(['user', this.user]);
  }

  naviga(pagina : string){
    this.user = this.tokenService.getLoggedUser();
    if(this.user == null || this.user == ""){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }
    this.router.navigate([pagina]);
  }

}
