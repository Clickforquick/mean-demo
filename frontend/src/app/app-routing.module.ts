import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { HomeComponent } from "app/home/home.component";
import { AuthGuard } from "app/_guards/auth.gaurd";
import { AdminAuthGuard } from "app/_guards/adminauth.gaurd";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AdminAuthGuard]},
    { path: 'login',  component : LoginComponent},
    { path: '**', redirectTo: '' }
];


export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard,AdminAuthGuard]

})
export class AppRoutingModule { }
