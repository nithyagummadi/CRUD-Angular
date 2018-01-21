import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user';
import { UserService } from "../shared/user.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  //users:User[]
  constructor(private userService:UserService,private toast:ToastrService) { }

  ngOnInit() {
    this.userService.findAll();
  //this.userService.UserChanged.subscribe((users:User[])=>{this.users=users});
  }

  update(user:User){
    this.userService.selectedUser=Object.assign({},user);
 }

  ondelete(id:string) {
     if(confirm("do you want to delete this record?")==true){
              this.userService.delete(id).subscribe(data=>
              {setTimeout(() => this.userService.findAll(), 1000);
               setTimeout(() => this.toast.warning("Record deleted Successfully","User Register"), 1000);
            });
              
    

    }
  }
}
