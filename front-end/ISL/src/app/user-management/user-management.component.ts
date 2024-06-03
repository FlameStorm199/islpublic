import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/auth/token.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  users : any[] = [];
  filteredUsers : any[] = [];

  formData = new FormGroup({
    cerca: new FormControl('')
  })

  constructor(private taskService : TaskService, private tokenService : TokenService, private router : Router, private userService: UserService){ }

  ngOnInit(): void {
    this.taskService.removeCompletingTask();
    this.taskService.resetPendingTasks();

    if(!this.tokenService.isLogged()){
      this.tokenService.clearAll();
      this.router.navigate(['']);
    }

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = this.users;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  filterUsers(){
    let cerca = this.formData.get('cerca')?.value;
    console.log(cerca);
    if(cerca != null && cerca != undefined)
      this.filteredUsers = this.users.filter(u => u.username.includes(cerca));
  }

  aggiungiUtente(){
    this.router.navigate(['admin/utenti/modifiche/aggiunta'])
  }

  modificaUtente(username : any){
    this.router.navigate(['admin/utenti/modifiche', username]);
  }

  rimuoviUtente(username : any){
    if(this.tokenService.getLoggedUser() == username){
      alert("Non puoi rimuovere l'utente con cui sei attualmente loggato!");
      return;
    }

    this.userService.deleteUser(username).subscribe({
      next: (response) => {
        alert(response.messaggio);
        window.location.reload();
      },
      error: (error) => {
        alert(error);
      }
    })
  }

}
