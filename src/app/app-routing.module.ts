import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/gaurds/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "userDashboard",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "adminDashboard",
    component: AdminComponent
  },
  {
    path: "edit/:id",
    component: EditUserComponent
  },
  {
    path: "",
    redirectTo: "/login?u=user",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
