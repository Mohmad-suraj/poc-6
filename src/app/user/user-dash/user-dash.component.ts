import { HttpClient } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  public info:any=[];
  public id:any=[];
  public newdata:any;
  public user:any;
  public friendsData:any=[];
  public chndata:any;
  public newuser:any;
  public currentdata:any;
  public currentuser:any;
  public url="http://localhost:3000/users/"
  constructor(private activatedroute:ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    
    this.activatedroute.params.subscribe((data)=>{console.log(data);this.id.push(data);console.log(this.id)});
    this.getdata();
   
    console.log(this.user);
   this.http.get(this.url).subscribe((data)=>{this.newdata=data;

    for(var i=0;i<this.newdata.length;i++){
     
        if(this.newdata[i].id!=this.id[0].id){
          console.log(this.newdata[i],"line 31"); 
          this.friendsData.push(this.newdata[i])
          console.log(this.friendsData)
        }
    }

   });

   console.log(this.friendsData,"friends array");
   console.log(this.id[0].id)
  }

  getdata(){
  this.http.get(this.url+`${this.id[0].id}`).subscribe((data)=>{console.log(data);this.info.push(data);console.log(this.info)});

  }



  add(id:any){
    console.log(id);
    
    this.http.get(this.url+`${id}`).subscribe((data)=>{console.log(data);})
   
   
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=> {console.log(data,"line 57");this.newuser=data;
    this.chndata=this.newuser.username;
    console.log(this.chndata)
    this.http.get(this.url+`${this.id[0].id}`).subscribe((data)=>{console.log(data,"59");
    this.currentuser=data;
    this.currentuser.friendRequest.push(this.chndata);
    this.http.put(this.url+`${this.id[0].id}`,this.currentdata).subscribe(data=>console.log(data))});
     
  })
  
  }



  logout(){
    localStorage.removeItem('tokenallowed')
    this.router.navigateByUrl('loginuser');
  }
}

