import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],  
  templateUrl: './signup.html',
   styleUrls: ['./signup.css']
})
export class Signup {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  fatherName:string='';
  gender: string = '';
  address: string = '';
  DOB:string='';

  constructor(private auth: Auth, private router: Router) {}

  onSignup() {

    console.log("Signup clicked"); // 👈 debugging ke liye

    if (!this.email || !this.password || !this.firstName || !this.lastName) {
      alert("Fill all  mandatory fields");
      return;
      
    }

     const message=this.auth.register({
      firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    phone: this.phone,
    fatherName: this.fatherName,
    gender: this.gender,
    address: this.address,
    DOB: this.DOB
    });

    console.log("Stored Users:", localStorage.getItem('users'));

    alert(message);
    if(message=="Registation sucessecful")
    this.router.navigate(['/login']);
  }
}