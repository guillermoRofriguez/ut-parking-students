import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  private registerVehiculoURL: string = `${environment.URL_API}/register/vehiculo`;
  private findClaveURL: string = `${environment.URL_API}/key/clave-send`;
  private insertUserURL: string = `${environment.URL_API}/key/inser-user`;
  private inserClaveToUSerURL: string = `${environment.URL_API}/key/inser-clave-to-user`;
  private getClaveToUSerUIDURL: string = `${environment.URL_API}/key/get-clave-id-user`;
  private linerarEspacionURL: string = `${environment.URL_API}/key/liberar-estacionameinto`

  constructor(private router: Router, private http: HttpClient) {}

  async registerVeiculo(uid: string,vehiculo: any) {
    try {
      const response = await this.http
        .post<{ code: number; message: string; data: any }>(
          this.registerVehiculoURL,
          {uid, vehiculo }
        )
        .toPromise();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findClave(uid: string) {
    try {
      const response = await this.http
        .post<{ code: number; message: string; data: any }>(this.findClaveURL, {
          uid,
        })
        .toPromise();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async inserUser(uid: string, userInfo: any) {
    try {
      const response = await this.http
        .post<{ code: number; message: string; data: any }>(
          this.insertUserURL,
          { uid, userInfo }
        )
        .toPromise();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async insertClaveToUser(uid: string, clave: string) {
    try {
      const inserClave = await this.http
        .post<{ code: number; message: string; data: any }>(
          this.inserClaveToUSerURL,
          { uid, clave }
        )
        .toPromise();
      return inserClave;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getClaveToUSerUID(uid: string) {
    console.log(uid);
    try {
      const response = await this.http.post<{code:number, message: string, data: any}>(this.getClaveToUSerUIDURL,{uid}).toPromise()
      console.log(response);
      
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async liberarSpacio(uid: string){
    try {
      const response = await this.http.post<{code: number, message: string, data: any}>(this.linerarEspacionURL,{uid}).toPromise();
      return response 
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
