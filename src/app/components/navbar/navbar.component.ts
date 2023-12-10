import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public navItems: any = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path !== '')
    .filter((route) => !route.path?.includes(':'))
}
