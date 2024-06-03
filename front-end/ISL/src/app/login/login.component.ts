import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  status : any = 0;
  isPasswordHidden : boolean = true;

  username : string | null | undefined = "";
  password : string | null | undefined = "";

  authenticated : boolean = true;
  filter$ : Observable<string | null> = of("");
  notlogged : boolean = false;

  errMsg: string = "Spiacente, lo username e/o la password sono errati!";
  errMsg2: string = "Spiacente, devi autenticarti per poter accedere alla pagina selezionata!";
  
  showPassword : any = {
    type : "password",
    img : "hide"
  };

  constructor(private router: Router, private tokenService : TokenService, private route : ActivatedRoute, private taskService : TaskService){ }

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();
    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('notlogged'))
    );

    this.filter$.subscribe(param => (param) ? this.notlogged = true : this.notlogged = false);
  }

  tryLogin(){
    this.notlogged = false;
    this.username = this.formData.get('username')?.value;
    this.password = this.formData.get('password')?.value;

    if(this.username == null || this.username == undefined || this.password == null || this.password == undefined)
      return;

    this.tokenService.authenticate(this.username, this.password).subscribe({
      next: (response) => {
        this.authenticated = true;
        this.tokenService.setAuthToken(this.username, response.token);
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.authenticated = false;
        alert(error);
      }
    });
  }

  changePasswordVisibility(){
    if (this.isPasswordHidden) {
      this.showPassword.type = 'text';
      this.showPassword.img = 'show';
    } else {
      this.showPassword.type = 'password';
      this.showPassword.img = 'hide';
    }
    this.isPasswordHidden = !this.isPasswordHidden;
  }
}
