import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from 'src/app/services/my-service.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  public loginadmin:FormGroup;
  public issub:boolean=false;
  public info:any;
  constructor(private router:Router,private http:HttpClient,private myservice:MyServiceService) { }

  ngOnInit(): void {
    localStorage.removeItem('tokenadmin');
    this.loginadmin=new FormGroup({
      
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])
    });
    this.getadmin();
  }
 getadmin(){
   this.http.get('http://localhost:3000/admin').subscribe((data)=>{this.info=data})
 }
  login(){
    this.issub=true;
    for(let i=0;i<this.info.length;i++){
      if(this.info[i].username==this.loginadmin.value.username && this.info[i].password==this.loginadmin.value.password){
        this.router.navigateByUrl('admindash');
        localStorage.setItem('tokenadmin','allowed');
      }
      else{
        alert("you are not the admin");
      }
    }
  

}


}
