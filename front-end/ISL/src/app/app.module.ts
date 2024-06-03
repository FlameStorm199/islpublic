import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { UserComponent } from './user/user.component';
import { RicezioneComponent } from './ricezione/ricezione.component';
import { SpedizioneComponent } from './spedizione/spedizione.component';
import { ConteggioComponent } from './conteggio/conteggio.component';
import { SpostamentoComponent } from './spostamento/spostamento.component';
import { TaskComponent } from './task/task.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { AuthInterceptorService } from 'src/services/interceptors/auth-interceptor.service';
import { ForbiddenInterceptor } from 'src/services/interceptors/forbidden.interceptor';
import { NetworkInterceptor } from 'src/services/interceptors/network.interceptor';
import { RicezionePalletComponent } from './ricezione-pallet/ricezione-pallet.component';
import { RicezioneRiepilogoComponent } from './ricezione-riepilogo/ricezione-riepilogo.component';
import { BancaleComponent } from './bancale/bancale.component';
import { SearchComponent } from './search/search.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { RicezionePalletInserimentoComponent } from './ricezione-pallet-inserimento/ricezione-pallet-inserimento.component';
import { SpedizionePalletComponent } from './spedizione-pallet/spedizione-pallet.component';
import { SpostamentoAreaComponent } from './spostamento-area/spostamento-area.component';
import { ConteggioAreaComponent } from './conteggio-area/conteggio-area.component';
import { AreaComponent } from './area/area.component';
import { ScaffaleComponent } from './scaffale/scaffale.component';
import { PostoComponent } from './posto/posto.component';
import { ModificaUtenteComponent } from './modifica-utente/modifica-utente.component';
import { ModificaTaskComponent } from './modifica-task/modifica-task.component';
// import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    UserComponent,
    RicezioneComponent,
    SpedizioneComponent,
    ConteggioComponent,
    SpostamentoComponent,
    TaskComponent,
    AdminComponent,
    ForbiddenComponent,
    RicezionePalletComponent,
    RicezioneRiepilogoComponent,
    BancaleComponent,
    SearchComponent,
    UserManagementComponent,
    TaskManagementComponent,
    RicezionePalletInserimentoComponent,
    SpedizionePalletComponent,
    SpostamentoAreaComponent,
    ConteggioAreaComponent,
    AreaComponent,
    ScaffaleComponent,
    PostoComponent,
    ModificaUtenteComponent,
    ModificaTaskComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
    // QRCodeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
