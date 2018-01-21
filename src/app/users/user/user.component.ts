import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service'
import { NgForm } from "@angular/forms/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private toast:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.reset();
    this.userService.selectedUser={
      id:null,
      firstName:'',
      lastName:'',
      email:'',
      city:''
    }
  }

  onSubmit(form:NgForm){
    if(form.value.id==null){
    this.userService.create(form.value).subscribe(data=>{this.resetForm(form)});
    setTimeout(() => this.userService.findAll(), 1000);
    //this.userService.findAll();
    setTimeout(() => this.toast.success('New user added successfully','User Register'), 1000);
    //this.toast.success('New user added successfully','User Register')
  }
else{
    //update
    this.userService.update(form.value.id,form.value).subscribe(data=>{this.resetForm(form)});
     setTimeout(() => this.userService.findAll(), 1000);
    //this.userService.findAll();
    setTimeout(() => this.toast.success('Record updated successfully','User Register'), 1000);
   // this.toast.success('Record updated successfully','User Register')
}
}
}

