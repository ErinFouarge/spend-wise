import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {SessionService} from '../../core/session';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatToolbar,
    MatButton,
    RouterLink,
    MatIconButton,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  session = inject(SessionService);
  router = inject(Router);

  logout() {
    this.session.clearSession();
    this.router.navigateByUrl('/login');
  }
}
