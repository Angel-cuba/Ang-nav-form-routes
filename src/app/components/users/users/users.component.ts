import { Component, inject } from '@angular/core';
import { UsersService } from '../../../service/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  public usersService = inject(UsersService);

 public users = this.usersService.users;
}
