import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  template: `
    <app-header></app-header>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-2xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-center mb-8">Criar Conta</h1>
        
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
        
        <div class="bg-white rounded-lg shadow p-8">
          <div class="flex justify-center mb-6">
            <button type="button" (click)="formData.userType = 'freelancer'"
                    [class]="formData.userType === 'freelancer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-6 py-2 rounded-l-full">Músico</button>
            <button type="button" (click)="formData.userType = 'employer'"
                    [class]="formData.userType === 'employer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-6 py-2 rounded-r-full">Contratante</button>
          </div>

          <form (ngSubmit)="onSubmit()" class="space-y-4">
            @if (formData.userType === 'freelancer') {
              <div>
                <label class="block text-sm font-medium mb-1">Nome</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required
                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              </div>
            } @else {
              <div>
                <label class="block text-sm font-medium mb-1">Nome da Empresa</label>
                <input type="text" [(ngModel)]="formData.companyName" name="companyName" required
                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              </div>
            }

            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" [(ngModel)]="formData.email" name="email" required
                     class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Telefone</label>
              <input type="tel" [(ngModel)]="formData.phone" name="phone"
                     class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Senha (mínimo 6 caracteres)</label>
              <input type="password" [(ngModel)]="formData.password" name="password" required minlength="6"
                     class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              @if (formData.password && formData.password.length < 6) {
                <p class="text-red-500 text-xs mt-1">A senha deve ter no mínimo 6 caracteres</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Confirmar Senha</label>
              <input type="password" [(ngModel)]="formData.passwordConfirm" name="passwordConfirm" required
                     class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <button type="submit" [disabled]="isLoading"
                    class="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
              {{ isLoading ? 'Registrando...' : 'Registrar' }}
            </button>

            <p class="text-center text-sm">
              Já tem conta? <a routerLink="/login" class="text-indigo-600 hover:text-indigo-700">Fazer login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class RegisterComponent {
  formData: RegisterRequest = {
    email: '',
    password: '',
    passwordConfirm: '',
    userType: 'freelancer',
    name: '',
    companyName: '',
    phone: '',
    document: ''
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    console.log('📝 Dados do formulário:', this.formData);
    
    // Validar senha mínima
    if (this.formData.password.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }
    
    // Validar senhas coincidem
    if (this.formData.password !== this.formData.passwordConfirm) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    this.isLoading = true;
    console.log('🔄 Enviando requisição para o backend...');
    
    this.authService.register(this.formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ Resposta do backend:', response);
        this.successMessage = '✅ Conta criada com sucesso! Redirecionando...';
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Erro completo:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Error.error:', error.error);
        
        // Extrair mensagem de erro do backend
        if (error.error?.errors && error.error.errors.length > 0) {
          this.errorMessage = error.error.errors.map((e: any) => e.msg).join(', ');
        } else {
          this.errorMessage = error.error?.error || error.error?.message || 'Erro ao registrar. Tente novamente.';
        }
      }
    });
  }
}
