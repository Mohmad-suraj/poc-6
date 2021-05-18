import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from '../../services/my-service.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_gK2E8TXAytVwuz3rvvpUd");

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})

export class LoginUserComponent implements OnInit {
  public searchname:any;
  public loginUser: FormGroup;
  public registerForm :FormGroup;
  public show:boolean =true;
  public issub:boolean=false;
  public issub1:boolean=false;
  public info:any;
  public num:any;
  public otp;
  public mail;
  public changeData:any;
  public register:string="userlogin";
 public  myurl="./assets/images/buildings.png"
   url="http://localhost:3000/users"
  constructor(private router:Router,private http:HttpClient,private myservice:MyServiceService) { }

  ngOnInit(): void {
    localStorage.removeItem('tokenallowed');
    this.loginUser=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required)
    });
    
    this.registerForm=new FormGroup({
      'name':new FormControl('',Validators.required),
      'age':new FormControl('',Validators.required),
      'phone':new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'address':new FormControl('',Validators.required),
      'profession':new FormControl('',Validators.required),
       'photo' :new FormControl(''),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'username':new FormControl('',Validators.required),
      'newpasswrd':new FormControl('',[Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      'isblocked':new FormControl(false),
      'isverified':new FormControl(false),
      'friendRequest':new FormControl(),
      'friend':new FormControl()
    }
    );
  this.getdata();
    this.num=Math.floor(Math.random()*100000+1);
  }

 
  getdata(){
    this.http.get(this.url).subscribe((data)=>{console.log(data);this.info=data;})
  }


  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_5daeh0n', 'template_yvvbh9m', e.target as HTMLFormElement, 'user_gK2E8TXAytVwuz3rvvpUd')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  verify(){
    if(this.otp==this.num){
      console.log(this.mail)
      alert(" you are verified now!! Now Refresh the page and login");
      this.otp="";
       for(let i=0;i<this.info.length;i++){
         if(this.mail===this.info[i].email){
          this.http.get("http://localhost:3000/users/"+`${this.info[i].id}`).subscribe((data)=>
          {
            this.changeData=data;
            this.changeData.isverified=true;
            console.log(this.changeData)
            this.http.put("http://localhost:3000/users/"+`${this.info[i].id}`,this.changeData).subscribe((data)=>
           {
              console.log(data);
           })
            
          })
         }
       }
      
    }
    else{
      console.log( "you are not verified")
    }
  }
  
 public login(){
  this.issub1=true;
  this.http.get(this.url).subscribe((data)=>{console.log(data);this.info=data});
  for(let i=0;i<this.info.length;i++){
     if(this.loginUser.value.email===this.info[i].email && this.loginUser.value.password===this.info[i].newpasswrd &&  this.loginUser.value.username===this.info[i].username ) {
         if(this.info[i].isblocked==false && this.info[i].isverified==true){
           this.router.navigateByUrl('userdash/'+`${this.info[i].id}`);   
           localStorage.setItem('tokenallowed','allowed');
         }
         else{
           alert('you might be blocked or not verified or check your credentials');
         }
 }
 
 }
 
}
 


 change(){
   this.show=!this.show;
   
   if(this.show){
     this.register="login";
   }
   else{
     this.register="register"
   }
 }

 check(){
   this.issub=true;
 
   if(this.registerForm.valid){
     this.registerForm.value.photo=this.myurl;
     this.http.post(this.url,this.registerForm.value).subscribe((data)=>{console.log(data);
      this.getdata();})
      this.change();
   }
 
 }

 selectfile(e){
   if(e.target.files){
     let reader =new FileReader();
     reader.readAsDataURL(e.target.files[0]);
     reader.onload=(event:any)=>{
       this.myurl=event.target.result;

     }
   }
 }


}
