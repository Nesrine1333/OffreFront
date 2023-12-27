import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

import { SaveAllComponent } from './Components/save-all/save-all.component';
import { ConstOffreComponent } from './Components/const-offre/const-offre.component';
import { ResetPasswordComponent } from './Components/Reset-password/reset-password.component';

import { AdminListOffreComponent } from './admin-list-offre/admin-list-offre.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { CreatOffreComponent } from './Components/creat-offre/creat-offre.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Accueil', component: DashboardComponent  ,canActivate: [AuthGuard]},
  
   
 
 
  { path: 'adminListOffre', component: AdminListOffreComponent  ,canActivate: [AuthGuard]},
  { path: 'adminListUser', component: AdminListUserComponent  ,canActivate: [AuthGuard]},

  { path: 'creatOffre', component: CreatOffreComponent  ,canActivate: [AuthGuard]},
  { path: 'importExcel', component: SaveAllComponent  ,canActivate: [AuthGuard]},

  { path: 'All', component: ConstOffreComponent  ,canActivate: [AuthGuard]},


{ path: 'resetPassword', component: ResetPasswordComponent},

{ path: '**', redirectTo: '/login' },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
