import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  #state = signal<any>({ users: [] });

  public users = computed(() => this.#state().users);
  constructor() {
    this.getUsers();
  }

  async getUsers() {
    this.http
      .get<any>('http://localhost:4000/users')
      .pipe(delay(1000))
      .subscribe((response) => {
        this.#state.set({ users: response.data });
      });
  }
}
