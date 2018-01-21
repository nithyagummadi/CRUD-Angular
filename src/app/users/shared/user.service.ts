import { Injectable, EventEmitter } from '@angular/core';
import {User} from './user';
import{ Http,Headers,Response,RequestMethod,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import './rxjs-operators';
@Injectable()
export class UserService {
  UserChanged= new EventEmitter<User[]>();
  private headerOptions= new Headers({'ContentType':'application/json'});
  private Url = '/api';
  selectedUser:User;
  users:User[];
  
  constructor(private http:Http) { }


  delete(id:string){
    var requestOptions= new RequestOptions({method:RequestMethod.Delete,headers:new Headers({'ContentType':'string'})});
    return this.http.delete(this.Url+"/users/delete/"+id,requestOptions);
  }


  create(user:User){
  
    var requestOptions= new RequestOptions({method:RequestMethod.Post,headers:this.headerOptions});
    var body=JSON.stringify(user);   
    return this.http.post(this.Url+"/users/create",user,requestOptions).map(x=>x.json());   
  }

  update(id,user){
      var requestOptions= new RequestOptions({method:RequestMethod.Put,headers:this.headerOptions});
      return this.http.put(this.Url+"/users/update/"+id,user,requestOptions).map(x=>x.json());
  }

  findAll(){
    this.http.get(this.Url+"/users").map((data:Response)=>{
      return data.json() as User[];
    }).toPromise().then(x=>{
      this.users=x;
    });

  }
 

}
