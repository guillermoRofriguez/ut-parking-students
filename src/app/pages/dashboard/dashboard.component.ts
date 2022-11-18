import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private auth: AngularFireAuth) { }

  async ngOnInit() {
    // this.auth.
    let res = this.authService.isAutenticated()
    console.log((await res).user); 
    
  }


}
