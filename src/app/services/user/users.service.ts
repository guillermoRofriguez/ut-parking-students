import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private infoUSerURL: string =`${environment.URL_API}/user/info-user`
  constructor(private http: HttpClient) { }

  async getUSerInfo(uid:string){
    try {
      const response = await this.http.post<{code: number, message: string, data: any}>(this.infoUSerURL,{uid}).toPromise();
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
