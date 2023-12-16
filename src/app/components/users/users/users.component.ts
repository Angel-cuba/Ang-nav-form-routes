import { Component, inject } from '@angular/core';
import { UsersService } from '../../../service/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  public service = inject(UsersService);

  public route = inject(ActivatedRoute);

  constructor(private router: Router) {}

  deleteUser(id: number) {
    this.service.deleteUser(id);

    this.router.navigate(['/dashboard/users']);
  }
}
