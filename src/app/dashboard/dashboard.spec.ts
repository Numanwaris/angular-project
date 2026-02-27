import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const loggedInEmail = localStorage.getItem('loggedInUser');
    if (!loggedInEmail) {
      this.router.navigate(['/login']);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.user = users.find((u: any) => u.email === loggedInEmail);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}