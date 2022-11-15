import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-registervehiculo',
  templateUrl: './registervehiculo.component.html',
  styleUrls: ['./registervehiculo.component.scss']
})
export class RegistervehiculoComponent implements OnInit {
  public form!: FormGroup
  public info: boolean = false

  constructor() {
    this.form = new FormGroup({
      vehiculo: new FormControl("", Validators.required),
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
    this.info = false
    if(this.form.value == undefined || this.form.value == null){
      this.info = true
       return
    }
    try {
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

}
