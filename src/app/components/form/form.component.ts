import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public service = inject(LoginService);

  public form: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });
  constructor(private formBuilder: FormBuilder, private router:Router) {}

  onSubmit() {
    const { username, password } = this.form.value;

    this.service.login(username, password).then((response) => {
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
