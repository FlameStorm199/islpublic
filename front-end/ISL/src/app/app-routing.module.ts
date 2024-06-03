import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RicezioneComponent } from './ricezione/ricezione.component';
import { SpedizioneComponent } from './spedizione/spedizione.component';
import { ConteggioComponent } from './conteggio/conteggio.component';
import { SpostamentoComponent } from './spostamento/spostamento.component';
import { TaskComponent } from './task/task.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from 'src/services/auth/route-guard.service';
import { Roles } from 'src/models/Roles';
import { AdminComponent } from './admin/admin.component';
import { RicezionePalletComponent } from './ricezione-pallet/ricezione-pallet.component';
import { RicezioneRiepilogoComponent } from './ricezione-riepilogo/ricezione-riepilogo.component';
import { BancaleComponent } from './bancale/bancale.component';
import { SearchComponent } from './search/search.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RicezionePalletInserimentoComponent } from './ricezione-pallet-inserimento/ricezione-pallet-inserimento.component';
import { SpedizionePalletComponent } from './spedizione-pallet/spedizione-pallet.component';
import { SpostamentoAreaComponent } from './spostamento-area/spostamento-area.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { ConteggioAreaComponent } from './conteggio-area/conteggio-area.component';
import { AreaComponent } from './area/area.component';
import { ScaffaleComponent } from './scaffale/scaffale.component';
import { PostoComponent } from './posto/posto.component';
import { ModificaUtenteComponent } from './modifica-utente/modifica-utente.component';
import { ModificaTaskComponent } from './modifica-task/modifica-task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'user/:username', component: UserComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'ricezione', component: RicezioneComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'ricezione/pallet/:id', component: RicezionePalletComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'ricezione/pallet/:taskId/inserimento', component: RicezionePalletInserimentoComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'ricezione/riepilogo', component: RicezioneRiepilogoComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'spedizione', component: SpedizioneComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'spedizione/pallet/:id', component: SpedizionePalletComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'conteggio', component: ConteggioComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'conteggio/pallet/:id', component: ConteggioAreaComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'spostamento', component: SpostamentoComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'spostamento/:id/area', component: SpostamentoAreaComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'task/:id', component: TaskComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'bancale/:id', component: BancaleComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'area/:id', component: AreaComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'scaffale/:idArea/:idScaffale', component: ScaffaleComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'posto/:idArea/:idScaffale/:idPosto', component: PostoComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data: {roles: [Roles.admin]}},
  { path: 'user-management', component: UserManagementComponent, canActivate:[AuthGuard], data: {roles: [Roles.admin]}},
  { path: 'admin/utenti/modifiche/:username', component: ModificaUtenteComponent, canActivate:[AuthGuard], data: {roles: [Roles.admin]}},
  { path: 'admin/task/modifiche/:username', component: ModificaTaskComponent, canActivate:[AuthGuard], data: {roles: [Roles.admin]}},
  { path: 'task-management', component: TaskManagementComponent, canActivate:[AuthGuard], data: {roles: [Roles.admin]}},
  { path: 'search', component: SearchComponent, canActivate:[AuthGuard], data: {roles: [Roles.user, Roles.admin]}},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
