import { Component } from '@angular/core';
import { User } from '../../../../interfaces/interfaces';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  public form: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    date: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}
  saveUser() {
    if (!this.form.valid) return;
    console.log(this.form.value);
    

    const user: User = {
      id: Date.now(),
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      date: this.form.value.date,
    }
    console.log("🚀 ~ file: user.component.ts:66 ~ UserComponent ~ saveUser ~ user:", user)
    
  }
}
