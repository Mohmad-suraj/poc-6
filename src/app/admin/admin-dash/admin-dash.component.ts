import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  public url="http://localhost:3000/users";
  public info:any;
  public changeData:any;
  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    this.http.get(this.url).subscribe(data=>{console.log(data);this.info=data;})
  }
  block(id:any)
  {
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=>
    {
      
      this.changeData=data;
      this.changeData.isblocked=true;
      console.log(this.changeData)
      this.http.put("http://localhost:3000/users/"+`${id}`,this.changeData).subscribe((data)=>
     {
        console.log(data);
     })
      
    })
  }
  unblock(id:any)
  {
    this.http.get("http://localhost:3000/users/"+`${id}`).subscribe((data)=>
    {
      
      this.changeData=data;
      this.changeData.isblocked=false;
      console.log(this.changeData)
      this.http.put("http://localhost:3000/users/"+`${id}`,this.changeData).subscribe((data)=>
     {
        console.log(data);
     })
      
    })
  }


 logout(){
   localStorage.removeItem('tokenadmin')
   this.router.navigateByUrl('loginadmin');
 }

}


