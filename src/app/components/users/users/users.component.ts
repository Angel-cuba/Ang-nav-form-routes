import { Component, inject } from '@angular/core';
import { UsersService } from '../../../service/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  public service = inject(UsersService);

}
