import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  register(user: any): string {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    const userExists = users.some((u: any) => u.email === user.email);
    if (userExists) {
      return "User already exists";
    }
// Add new user
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return "Registration successful";
  }

  login(email: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) =>
    u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }

  return false;
}
}