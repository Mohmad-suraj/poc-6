import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashComponent } from './user-dash/user-dash.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@NgModule({
  declarations: [
   
    LoginUserComponent,
    LoginAdminComponent,
    UserDashComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule

  ]
})
export class UserModule { }
