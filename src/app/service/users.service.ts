import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { delay } from 'rxjs';
import { User } from '../../interfaces/interfaces';

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

  #state = signal<UserService>({ users: [] });
  #userState = signal<any>({ user: {} });

  public users = computed(() => this.#state().users);
  public user = computed(() => this.#userState().user);
  constructor() {
    this.getUsers();
  }

  async getUsers() {
    this.http
      .get<User[]>('http://localhost:4000/users')
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({ users: response });
      });
  }
  async addUser(user: User) {
    this.http
      .post<User>('http://localhost:4000/users', user)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({ users: [...this.users(), response] });
      });
  }
  async deleteUser(id: number) {
    this.http
      .delete<SingleUser>(`http://localhost:4000/users/${id}`)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({
          users: this.users().filter((user: { id: number }) => user.id !== id),
        });
      });
  }

  async updateUser(id: number, user: User) {
    this.http
      .put<any>(`http://localhost:4000/users/${id}`, user)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({
          users: this.users().map((user: { id: number }) =>
            user.id === response.id ? response : user
          ),
        });
      });
  }

  async getUserById(id: number) {
    this.http
      .get<SingleUser>(`http://localhost:4000/users/${id}`)
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#userState.set({ user: response });
      });
  }
}
