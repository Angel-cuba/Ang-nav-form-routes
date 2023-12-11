import { Component } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    date: '',
  };

  public form: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
    date: '',
  });

  constructor(private formBuilder: FormBuilder) {}
  saveUser() {
    console.log('Take your user: ', this.form.value);
  }
}
