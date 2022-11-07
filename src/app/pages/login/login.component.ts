import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Authenticated } from 'src/app/module/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrom: FormGroup
  public error = false
  public errorMessage = '';
  public loading: boolean;
  public isSignedIn: boolean = false;
  public authState: Authenticated = {};
  constructor(private fb: FormBuilder,private autService: AuthService) {
    this.loading = false;
    this.loginFrom = this.fb.group ({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = true;
    }, 5000)
  }


  async login(){
    try {
      await this.autService.login(this.loginFrom.value)
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }

  async logOut(){
    await this.autService.logOut()
    try {
    } catch (error) {
      
    }
  }
}
