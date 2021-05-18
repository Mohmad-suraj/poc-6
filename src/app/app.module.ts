import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import {MyServiceService} from '../app/services/my-service.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsModule } from './friends/friends.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AdminModule,UserModule,FriendsModule,HttpClientModule
  ],
  providers: [MyServiceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
