import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGaurd } from './gaurds/auth.gaurd';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate:[AuthGaurd]},
  { path: 'login', component: LoginComponent },
  { path: 'patients/detail', component: PatientDetailComponent, canActivate:[AuthGaurd] },
  { path: '**', component: NotFoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
