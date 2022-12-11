import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { TweetService } from '../service/tweet.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/User';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})


export class AllusersComponent implements OnInit {
  error = false;
  username: any;
  user: string = '';
  users:User[]=[];
  userlist: any;

  constructor(private tweetService: TweetService,private authService:AuthService) {

  }

  display = "none";
  ngOnInit(): void {
    
    this.getAllUsers()
    
  }

  getusername() {
    this.username = localStorage.getItem('username')
  }

  getAllUsers(){
    this.authService.getAllUsers().pipe().subscribe(res=>{
      if(res.status==200){
        console.log(res)
        this.users=res.data
      }
    })
  }

  getUsernames(user: string) {
    let uList: any[] = []
    if(user.length==0){
      this.authService.getAllUsers().pipe().subscribe(res=>{
        if(res.status==200){
          console.log(res)
          this.users=res.data
        }
      })
    }else{
      this.authService.getAllUsersWithRegex(user).pipe().subscribe(res => {
        if (res.status == 200) {
          this.users=res.data
        }
        else {
          console.log(res)
          Swal.fire("Error", res.message);
        }
      })
    }
    
    
  }




}

