import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AuthGuard } from './guard/auth.guard';

import { LoginAdminComponent } from './user/login-admin/login-admin.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { UserDashComponent } from './user/user-dash/user-dash.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


const routes: Routes = [
  {
    path:"",component:UserLoginComponent
  },
  {
    path:"userslogin",component:UserLoginComponent
  },
  {
    path:"loginuser",component:LoginUserComponent
  },
  {
    path:"loginadmin",component:LoginAdminComponent
  },
  {
    path:'userdash/:id',component:UserDashComponent,canActivate:[AuthGuard]
  },
  {
    path:'admindash',component:AdminDashComponent,canActivate:[AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
