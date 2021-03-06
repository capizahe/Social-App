import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { CryptoService } from './crypto.service';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from  "@angular/fire/auth";
import * as firebase from 'firebase';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserList : AngularFireList<any>;
  selectedUser: User = new User();


  constructor(private crypto:CryptoService, private datePipe:DatePipe,private firebase:AngularFireDatabase,private angularAuth:AngularFireAuth, private router:Router) {}

  getUsers(){
    return this.UserList = this.firebase.list('users')
  }
 async addUser(user:User){
   try{
    this.selectedUser.email = user.email;
    user.fecha_creacion = new Date();
    this.UserList.push({
      nombre: user.nombre,
      apellido: user.apellido,
      fecha_creacion: this.datePipe.transform(user.fecha_creacion,'dd/MM/yyyy'),
      email: user.email
    });
    await this.angularAuth.auth.createUserWithEmailAndPassword(user.email,user.contrasena)
    .finally(() =>{
      alert("Registro satisfactorio");
    })
    .catch(err =>{
      alert("El correo ya se encuentra registrado o los datos son erroneos")
    })
} catch(e){
  alert("Error!"  +  e.message);
}
  }

  getInfoByEmail(){
    let email;
    if(localStorage.getItem('email')!=null){

      email = localStorage.getItem('email')
      let db = firebase.database()
      
      let ref = db.ref('users')
      ref.orderByChild('email').equalTo(email).on('child_added',function(snapshot){
          localStorage.setItem('nombre',snapshot.val().nombre);
          localStorage.setItem('apellido',snapshot.val().apellido);
         });
    }

  }

}
