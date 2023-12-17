import { Component } from '@angular/core';
import { TitleComponent } from '../components/title/title.component';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TitleComponent, FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor() {}
}
