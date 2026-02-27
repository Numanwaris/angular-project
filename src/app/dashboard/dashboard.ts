import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  user: any;
   selectedMenu: string = 'Home';
   isEditMode: boolean = false;
   homeImages: string[] = [];
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');

  if (!userData) {
    this.router.navigate(['/login']);
    return;
  }

  this.user = JSON.parse(userData);
   this.homeImages = JSON.parse(localStorage.getItem('homeImages') || '[]');
}
onImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.user.photo = reader.result;
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  };

  reader.readAsDataURL(file);
}

saveProfile() {
  localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  this.isEditMode = false;
}
onHomeImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.homeImages.push(reader.result as string);
    localStorage.setItem('homeImages', JSON.stringify(this.homeImages));
  };

  reader.readAsDataURL(file);
}
deleteImage(index: number) {
  this.homeImages.splice(index, 1);

  // Update localStorage
  localStorage.setItem('homeImages', JSON.stringify(this.homeImages));
}
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}