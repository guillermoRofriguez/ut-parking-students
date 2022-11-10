import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
public form!: FormGroup
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
  campoRequired(campo:string){
    return this.form.controls[campo].hasError('required') && this.form.controls[campo].touched
  }
}
