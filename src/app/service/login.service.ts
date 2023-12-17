import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin } from '../../interfaces/interfaces';

type User = {
  users: UserLogin[];
};
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = environment.url

  #state = signal<User>({ users: [] });
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<UserLogin[]>(this.url).pipe(delay(1000)).subscribe((response) => {
      this.#state.set({ users: response });  
    });
  }


  async login(username: string, password: string) {
    const user = this.#state().users.find((user: UserLogin) => user.username === username && user.password === password);
    if (user) {
      this.showSnackBar('Login success');
      return {
        id: user.id,
        role: user.role,
      };
    }
    this.showSnackBar('Login failed');
    return false;
  }

  checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
      return false
    }
    return user
  }

  logout() {
    localStorage.removeItem('user');
    this.showSnackBar('Logout success');
  }


  showSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}