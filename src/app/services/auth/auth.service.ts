import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Authenticated } from 'src/app/module/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import Swal from 'sweetalert2';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public admin?: boolean
  constructor(private afs: AngularFirestore ,private auth: AngularFireAuth, private router: Router) { }


  
  async login(data: any){
    try {
      var {email, password} = data
      await this.getEmail(email)
      console.log(data);
      if(this.admin){
        await this.auth.signInWithEmailAndPassword(email, password).catch((e: any)=>{
          console.log(e);
          
          if (e.code == 'auth/too-many-requests') {
            console.log('accrso');
            
            Swal.fire({
              title: 'Error',
              text: 'El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.',
              confirmButtonText: 'Aceptar',
              allowEscapeKey: false,
              allowOutsideClick: false,
              customClass: {
                container: "iosAlert",
                confirmButton: "blue",
              }
            });
          }
          if (e.code == 'auth/wrong-password') {
            Swal.fire({
              title: 'Error',
              text: 'La contraseña es incorrecta, intente de nuevo.',
              confirmButtonText: 'Reintentar',
              allowEscapeKey: false,
              allowOutsideClick: false,
              customClass: {
                container: "iosAlert",
                confirmButton: "blue",
              }
            });
          }
        });
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }


  async getEmail(email: string){
    
    try {
      console.log(email);
      var ref = await this.afs.collection('Users', res => res.where('email', '==', email)).get().toPromise()
      console.log(ref?.docs);
      if(ref?.docs[0].exists != true){
        console.log('entra if');
        
        Swal.fire({
          title: 'Error',
          text: 'Este usuario no existe, pruebe con otro.',
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            container: "iosAlert",
            confirmButton: "blue",
          }
        });
        
      }else {
        console.log('entra els');
        this.admin = ref.docs[0]?.exists;
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getUserInfo(uid: string){
    console.log(uid);
    
    try {
      const responser = await this.afs.collection("Users", ref => ref.where("id", '==', uid)).get().toPromise()
      console.log(responser?.docs[0].id);
      
      if(responser?.empty){
        throw{
          error: "User not exist"
        }
      }
      let docRef = responser?.docs[0].id
      let data: any = responser?.docs[0].data()
      return {docRef, ...data}
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async isLogged(){
    return await this.auth.authState.pipe(first()).toPromise()
  }

  async isAutenticated():Promise<Authenticated>{
    const user = await this.isLogged();
    console.log(user);
    
    if (user) {
      return { res: true, user: user.uid };
    } else {
      return { res: false };
    }
  }

  async logOut(){
    await this.auth.signOut();
    this.router.navigate(['/sing-in']);
  }
}
