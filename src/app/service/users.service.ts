import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { delay } from 'rxjs';
import { User } from '../../interfaces/interfaces';
import { environment } from '../../environments/environment';

type UserService = {
  users: User[]
};

type SingleUser = {
  user: User;
}

@Injectable({
  providedIn: 'root',
})


export class UsersService {
  private http = inject(HttpClient);

  url: string = environment.baseUrl;

  #state = signal<UserService>({ users: [] });
  #userState = signal<any>({ user: {} });

  public users = computed(() => this.#state().users);
  public user = computed(() => this.#userState().user);

  constructor( private snackBar: MatSnackBar ) {
    this.getUsers();
  }

  async getUsers() {
    this.http
      .get<User[]>(this.url)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({ users: response });
        this.showSnackBar('Users loaded');
      });
  }
  async addUser(user: User) {
    this.http
      .post<User>(this.url, user)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({ users: [...this.users(), response] });
        this.showSnackBar('User added');
      });
  }
  async deleteUser(id: number) {
    this.http
      .delete<SingleUser>(`${this.url}/${id}`)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({
          users: this.users().filter((user: { id: number }) => user.id !== id),
        });
        this.showSnackBar('User deleted');
      });
  }

  async updateUser(id: number, user: User) {
    this.http
      .put<any>(`${this.url}/${id}`, user)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({
          users: this.users().map((user: { id: number }) =>
            user.id === response.id ? response : user
          ),
        });
        this.showSnackBar('User updated');
      });
  }

  async getUserById(id: number) {
    this.http
      .get<SingleUser>(`${this.url}/${id}`)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#userState.set({ user: response });
        this.showSnackBar('User loaded');
      });

  }

  async showSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
