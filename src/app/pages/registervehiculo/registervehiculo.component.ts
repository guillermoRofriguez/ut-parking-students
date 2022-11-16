import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
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

  constructor(private vehiculoService: VehiculosService, private isAut: AuthService) {
    this.form = new FormGroup({
      type: new FormControl("", Validators.required),
      marca: new FormControl("",Validators.required),
      modelo: new FormControl("",),
      placa: new FormControl("", Validators.required)
    })
   }

  ngOnInit(): void {
  }
  
  RegisterVehiculo(): void{

  }
  campoRequired(campo:string){
    return this.form.controls[campo].hasError('required') && this.form.controls[campo].touched
  }

  register(even: any){
    let user = this.isAut.isAutenticated()
    console.log(user);
    
    this.info = false
    if(this.form.value == undefined || this.form.value == null){
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
          this.vehiculoService.registerVeiculo(this.form.value)
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

}
