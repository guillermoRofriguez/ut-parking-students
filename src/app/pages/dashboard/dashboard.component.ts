import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/user/users.service';
import { VehiculosService } from 'src/app/services/vehiculo/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  claveString: boolean = false
  public userInfo: any
  form = new FormControl('',[Validators.required]);
  public claveUSer!: string 
  // matcher = new MyErrorStante
  constructor(private authService: AuthService, private auth: AngularFireAuth, private userService:UsersService, private veiculoService: VehiculosService) { }

  async ngOnInit() {
    let res = this.authService.isAutenticated()
    let userUDI: any = (await res).user
    await this.getUserInfo(userUDI)
    this.getClaveToUSer()
  }

  async getUserInfo(uidUser: string){
    try {
      let user =  await this.userService.getUSerInfo(uidUser)
      this.userInfo = user?.data
      console.log(this.userInfo);
      
    } catch (error) {
      console.log(error);
    }
  }

  async getClaveToUSer(){
    try {
      let users = await this.veiculoService.getClaveToUSerUID(this.userInfo?.uid);
      console.log(users?.data);
      users?.data.forEach((element:any) => {
        console.log(element);
         this.claveUSer = element.uid
      });
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async sendClave(clave:string){
    this.claveString = false
    if(this.form.value == ''){
      console.log('entra');
      this.claveString = true
      return
    }
    if(this.userInfo.claveActive == true){
      console.log('el usuario ya tiene clave');
      Swal.fire({
        icon:'info',
        title: 'Error',
        text:'Ya tienes asignado un estacionamiento',
        timer:2000,
        showConfirmButton: false,
        customClass:{
          container:'iosAlert'
        }
      })    
      return
    }
    try {
      let response = await this.veiculoService.findClave(clave)
      let info =  response?.data
      console.log(info);
      
      if(response?.data == null){
        Swal.fire({
          icon:'error',
          title:"Clave invalida",
          text:"Esta clave no existe",
          timer: 2000,    
          showConfirmButton: false,
          customClass:{
            container: "iosAlert"
          }
        })
      }else if(info.disponible == false){
        Swal.fire({
          icon: 'question',
          title: 'Ocupado',
          text: 'El espacio ya esta ocupado',
          timer:2000,
          showConfirmButton:false,
          customClass:{
            container: 'iosAlert',
          }
        })
      }
      else{
        this.inserUser(clave, this.userInfo)
        this.insertClaveToUser(clave)
        Swal.fire({
          icon: 'success',
          // title: 'El espacio se agrego correctamente',
          text: 'El espacio se agrego correctamente',
          showConfirmButton: false,
          timer: 2000,
          customClass:{
            container:'iosAlert'
          }
        }).then(result =>{
          // location.reload()
        }
        )
      }
      console.log(response?.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  async inserUser(uid: string,userInfo: any){
    try {
      let insertUser = await this.veiculoService.inserUser(uid, userInfo)
      // console.log(insertUser);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async insertClaveToUser(clave: string){
    try {
      let insertClaveUser = await this.veiculoService.insertClaveToUser(this.userInfo.uid ,clave)
      // console.log(insertClaveUser);
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async liberarEsctacinamiento(uid:string){
    console.log(uid);
    if(uid == undefined){
     Swal.fire({
      icon: "error",
      text: "No tienes un estacionamiento asignado",
      showConfirmButton: false,
      timer: 3000,
      customClass:{
        container:"iosAlert"
      }
     }) 
     return
    }
    try {
      Swal.fire({
        title: "Liberar",
        text: "¿Deseas liberar el espacio?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Liberar",
        customClass:{
          container: "iosAlert",
          confirmButton: "red",
          cancelButton: "blue"
        }
      }).then(result =>{
        if(result.isConfirmed){
          console.log('se confirmo');
          this.veiculoService.liberarSpacio(uid)
         location.reload() 
        }
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  }


}
