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
  // matcher = new MyErrorStante
  constructor(private authService: AuthService, private auth: AngularFireAuth, private userService:UsersService, private veiculoService: VehiculosService) { }

  async ngOnInit() {
    let res = this.authService.isAutenticated()
    let userUDI: any = (await res).user
    await this.getUserInfo(userUDI)
  }

  async getUserInfo(uidUser: string){
    try {
      let user =  await this.userService.getUSerInfo(uidUser)
      this.userInfo = user?.data
    } catch (error) {
      console.log(error);
      
    }
  }

  async sendClave(clave:string){
    this.claveString = false
    if(this.form.value == ''){
      console.log('entra');
      this.claveString = true
      return
    }
    try {
      let response = await this.veiculoService.findClave(clave)
      let info =  response?.data
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
      }else if(info.disponible == true){
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
          location.reload()
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
      console.log(insertUser);
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }


}
