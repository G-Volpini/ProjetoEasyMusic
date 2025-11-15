import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { Profile, ProfileUpdateRequest } from '../models/profile.model';

@Component({
  selector: 'app-profile-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-6">
        <!-- User Info Card -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ user?.name }}</h2>
              <p class="text-gray-600">{{ user?.email }}</p>
              <span class="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                {{ user?.userType === 'freelancer' ? 'Músico' : 'Contratante' }}
              </span>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Membro desde</p>
              <p class="text-sm text-gray-900">{{ formatDate(user?.createdAt) }}</p>
            </div>
          </div>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-8">Gerenciar Perfil Profissional</h1>

        @if (errorMessage) {
          <div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ errorMessage }}
          </div>
        }

        @if (successMessage) {
          <div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {{ successMessage }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow p-8 space-y-6">
          <!-- Biografia -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
            <textarea [(ngModel)]="profileData.bio" name="bio" rows="4"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Conte um pouco sobre você..."></textarea>
          </div>

          <!-- Gêneros Musicais -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gêneros Musicais</label>
            <input [(ngModel)]="musicalGenresInput" name="musicalGenres" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                   placeholder="Ex: Pop, Rock, Jazz (separados por vírgula)">
          </div>

          <!-- Instrumentos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instrumentos</label>
            <input [(ngModel)]="instrumentsInput" name="instruments" type="text"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                   placeholder="Ex: Violão, Piano, Bateria (separados por vírgula)">
          </div>

          <!-- Localização -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
              <input [(ngModel)]="profileData.location!.city" name="city" type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <input [(ngModel)]="profileData.location!.state" name="state" type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
          </div>

          <!-- Preço por Hora -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preço por Hora (R$)</label>
            <input [(ngModel)]="profileData.hourlyRate" name="hourlyRate" type="number" min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>

          <!-- Disponibilidade -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Disponibilidade</label>
            <select [(ngModel)]="profileData.availability" name="availability"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Disponível">Disponível</option>
              <option value="Parcialmente disponível">Parcialmente disponível</option>
              <option value="Indisponível">Indisponível</option>
            </select>
          </div>

          <!-- Anos de Experiência -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Anos de Experiência</label>
            <input [(ngModel)]="profileData.yearsOfExperience" name="yearsOfExperience" type="number" min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>

          <!-- Redes Sociais -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900">Redes Sociais</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
              <input [(ngModel)]="profileData.socialMedia!.instagram" name="instagram" type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="@seuusuario">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
              <input [(ngModel)]="profileData.socialMedia!.youtube" name="youtube" type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="URL do canal">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Spotify</label>
              <input [(ngModel)]="profileData.socialMedia!.spotify" name="spotify" type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="URL do perfil">
            </div>
          </div>

          <!-- Botões -->
          <div class="flex gap-4">
            <button type="submit" [disabled]="isLoading"
                    class="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
              {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
            <button type="button" (click)="cancel()"
                    class="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>

    <app-footer></app-footer>
  `
})
export class ProfileManagerComponent implements OnInit {
  user: any = null;
  profileData: ProfileUpdateRequest = {
    bio: '',
    musicalGenres: [],
    instruments: [],
    location: { city: '', state: '', country: 'Brasil' },
    hourlyRate: 0,
    availability: 'Disponível',
    yearsOfExperience: 0,
    socialMedia: { instagram: '', youtube: '', spotify: '' }
  };

  musicalGenresInput = '';
  instrumentsInput = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Carregar dados do usuário
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    this.loadProfile();
  }

  formatDate(date: any): string {
    if (!date) return 'Recentemente';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  loadProfile(): void {
    this.profileService.getMyProfile().subscribe({
      next: (profile) => {
        this.profileData = {
          bio: profile.bio,
          musicalGenres: profile.musicalGenres,
          instruments: profile.instruments,
          location: profile.location,
          hourlyRate: profile.hourlyRate,
          availability: profile.availability,
          yearsOfExperience: profile.yearsOfExperience,
          socialMedia: profile.socialMedia
        };
        
        this.musicalGenresInput = profile.musicalGenres?.join(', ') || '';
        this.instrumentsInput = profile.instruments?.join(', ') || '';
      },
      error: (error) => {
        console.error('Erro ao carregar perfil:', error);
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Converter inputs de texto para arrays
    this.profileData.musicalGenres = this.musicalGenresInput.split(',').map(g => g.trim()).filter(g => g);
    this.profileData.instruments = this.instrumentsInput.split(',').map(i => i.trim()).filter(i => i);

    this.isLoading = true;

    this.profileService.updateMyProfile(this.profileData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Perfil atualizado com sucesso!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Erro ao atualizar perfil. Tente novamente.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
