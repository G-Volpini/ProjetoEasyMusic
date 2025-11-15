import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    RouterLink
  ],
  template: `
    <app-header></app-header>
    <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Faça login em sua conta
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Ou
                <a routerLink="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                    crie uma nova conta
                </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                @if (errorMessage) {
                    <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {{ errorMessage }}
                    </div>
                }
                
                @if (successMessage) {
                    <div class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {{ successMessage }}
                    </div>
                }
                
                <form class="space-y-6" (ngSubmit)="onSubmit()">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Endereço de email
                        </label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" [(ngModel)]="formData.email" required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" [(ngModel)]="formData.password" required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                Lembre de mim
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" [disabled]="isLoading"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {{ isLoading ? 'Entrando...' : 'Fazer login' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
  `,
})
export class LoginComponent {
  formData: LoginRequest = { email: '', password: '' };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.login(this.formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = '✅ Login realizado com sucesso! Redirecionando...';
        console.log('Login bem-sucedido:', response);
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro no login:', error);
        this.errorMessage = error.error?.error || 'Erro ao fazer login. Verifique suas credenciais.';
      }
    });
  }
}