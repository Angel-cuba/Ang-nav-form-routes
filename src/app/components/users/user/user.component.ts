import { Component, inject } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../service/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public service = inject(UsersService);

  public route = inject(ActivatedRoute);

  public isEditing:boolean = false;

  public id: number = 0;
  public form: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    date: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.isEditing = true;
        this.id = userId;
        this.loadUser(userId);
      }
    });
  }
  saveUser() {
    if (!this.form.valid) {
      console.error('Invalid form');
      return;
    }

    if (!this.isEditing) {
      const user: User = {
        id: Date.now(),
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        date: this.form.value.date,
      };
      this.service.addUser(user);

      //! reset form and redirect
      this.form.reset();
      this.router.navigate(['/dashboard/users']);
    } else {
      const user: User = {
        id: this.id,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        date: this.form.value.date,
      };
      this.service.updateUser(user.id, user);

      //! reset form and redirect
      this.form.reset();
      this.router.navigate(['/dashboard/users']);
    }
  }

  loadUser(id: number) {
    this.service.getUserById(id);
  }
}
