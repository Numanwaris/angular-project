import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
  console.log("Login clicked:", this.email, this.password);

  const success = this.auth.login(this.email, this.password);
  console.log("Login success?", success);

  if (success) {
    console.log("Navigate to dashboard");
    this.router.navigate(['/dashboard']);
    
  } else {
    alert("Invalid Credentials");
  }
}
}