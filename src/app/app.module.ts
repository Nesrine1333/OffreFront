import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';
import { LoginComponent } from './Components/Login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreatOffreComponent } from './Components/creat-offre/creat-offre.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SaveAllComponent } from './Components/save-all/save-all.component';
import { ConstOffreComponent } from './Components/const-offre/const-offre.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResetPasswordComponent } from './Components/Reset-password/reset-password.component';

import { AdminListOffreComponent } from './admin-list-offre/admin-list-offre.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { ListOfferConfirmeComponent } from './list-offer-confirme/list-offer-confirme.component';
import { ListOfferNonConfirmeComponent } from './list-offer-non-confirme/list-offer-non-confirme.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreatOffreComponent,
    NavbarComponent,
    SaveAllComponent,
    ConstOffreComponent,
    ResetPasswordComponent,
    AdminListOffreComponent,
    AdminListUserComponent,
    ListOfferConfirmeComponent,
    ListOfferNonConfirmeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
