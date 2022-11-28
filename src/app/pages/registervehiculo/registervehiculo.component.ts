import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VehiculosService } from 'src/app/services/vehiculo/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registervehiculo',
  templateUrl: './registervehiculo.component.html',
  styleUrls: ['./registervehiculo.component.scss']
})
export class RegistervehiculoComponent implements OnInit {
  public form!: FormGroup
  public info: boolean = false
  userUDI:any

  constructor(private vehiculoService: VehiculosService, private isAut: AuthService, private route: Router) {
    this.form = new FormGroup({
      type: new FormControl("", Validators.required),
      marca: new FormControl("",Validators.required),
      modelo: new FormControl("",),
      placa: new FormControl("", Validators.required)
    })
   }

  async ngOnInit() {
    let res = this.isAut.isAutenticated()
    this.userUDI = (await res).user
    
  }
  
  RegisterVehiculo(): void{

  }
  campoRequired(campo:string){
    return this.form.controls[campo].hasError('required') && this.form.controls[campo].touched
  }

  register(even: any){
   console.log(this.userUDI);
   
    console.log(this.form.invalid);
    
    
    this.info = false
    if(this.form.invalid == true){
      this.info = true
       return
    }
    else{
      console.log('es valido');
      Swal.fire({
        title:'Registrar transporte',
        text:'El vehiculo se registrara',
        showCancelButton: true,
        cancelButtonText:'Cancelar',
        confirmButtonText:'Registrar',
        customClass:{
          container:'iosAlert',
          confirmButton:'blue',
          cancelButton:'red'
        }
      }).then((result:any) =>{
        console.log(result);
        if(result.isConfirmed == true){
          console.log(this.form.value);
          this.vehiculoService.registerVeiculo(this.userUDI, this.form.value)
          location.reload()
        }
      })
      
    }
    try {
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  // allVehiculos(){
  //  try {
  //   this.route.navigate(['/sing-in/'])
  //  } catch (error) {
  //   console.log(error);
  //   throw error
  //  } 
  // }

}
