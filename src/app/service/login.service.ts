import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Welcome', {
      duration: 2000,
    });
  }
}