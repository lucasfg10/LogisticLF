import { Component, computed, signal } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Choferes', url: '/choferes', icon: 'home' },
    { title: 'Clientes', url: '/clientes', icon: 'archive' },
    { title: 'Vehiculos', url: '/vehiculos', icon: 'heart' },
    //{ title: 'Categorías', url: '/categories', icon: 'paper-plane' },
    //{ title: 'Usuarios', url: '/users', icon: 'mail' },
  ];

  user: User | null = null;
  isLoading = true;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  login() {
    this.authService.loginWithGoogle()
      .then(result => {
        console.log('Usuario logueado:', result.user);
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
  }

  logout() {
    this.authService.logout();
  }
}
