import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private registerVehiculoURL: string  = `${environment.URL_API}/register/vehiculo`;
  private findClaveURL: string = `${environment.URL_API}/key/clave-send`;
  private insertUserURL: string = `${environment.URL_API}/key/inser-user`

  constructor(private router: Router, private http: HttpClient) { }
  
  async registerVeiculo(vehiculo: any){
    try {
      const response = await this.http.post<{code:number, message: string, data: any}>(this.registerVehiculoURL,{vehiculo}).toPromise()
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async findClave(uid: string){
    try {
      const response = await this.http.post<{code: number, message: string, data: any}>(this.findClaveURL,{uid}).toPromise();
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async inserUser(uid: string, userInfo: any){
    try {
      const response = await this.http.post<{code:number, message: string, data: any}>(this.insertUserURL,{uid,userInfo}).toPromise()
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }


}
