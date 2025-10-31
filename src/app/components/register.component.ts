import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
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
                Crie uma nova conta
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Ou
                <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    faça login em sua conta existente
                </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div class="flex justify-center mb-6">
                    <div class="relative rounded-full p-1 bg-gray-200">
                        <button (click)="userType = 'freelancer'"
                                [ngClass]="{'bg-indigo-600 text-white': userType === 'freelancer', 'bg-gray-200 text-gray-500': userType !== 'freelancer'}"
                                class="relative rounded-full py-2 px-6 text-sm font-medium focus:outline-none transition-colors duration-300">
                            Freelancer
                        </button>
                        <button (click)="userType = 'employer'"
                                [ngClass]="{'bg-indigo-600 text-white': userType === 'employer', 'bg-gray-200 text-gray-500': userType !== 'employer'}"
                                class="relative rounded-full py-2 px-6 text-sm font-medium focus:outline-none transition-colors duration-300">
                            Empregador
                        </button>
                    </div>
                </div>

                <form class="space-y-6" action="#" method="POST">
                    @if (userType === 'freelancer') {
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <div class="mt-1">
                                <input id="name" name="name" type="text" autocomplete="name" required
                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>
                    }

                    @if (userType === 'employer') {
                        <div>
                            <label for="company-name" class="block text-sm font-medium text-gray-700">
                                Nome da Empresa
                            </label>
                            <div class="mt-1">
                                <input id="company-name" name="company-name" type="text" autocomplete="organization" required
                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>
                    }

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Endereço de email
                        </label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="new-password"
                                   required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="password-confirm" class="block text-sm font-medium text-gray-700">
                            Confirme a senha
                        </label>
                        <div class="mt-1">
                            <input id="password-confirm" name="password-confirm" type="password"
                                   autocomplete="new-password" required
                                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
  `,
})
export class RegisterComponent {
  userType: 'freelancer' | 'employer' = 'freelancer';
}
