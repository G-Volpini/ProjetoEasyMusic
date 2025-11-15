import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8">
      @if (isLoading) {
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            <p class="text-gray-600 mt-4 text-lg">Carregando detalhes do projeto...</p>
          </div>
        </div>
      }
      
      @if (!isLoading && project) {
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Breadcrumb -->
          <button (click)="goBack()" class="mb-6 flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors group">
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Voltar para Explorar
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Coluna Principal (2/3) -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Card Principal -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <!-- Imagem -->
                <div class="relative aspect-[16/9] bg-gray-200">
                  <img [src]="project.imageUrl" [alt]="project.title" 
                       class="w-full h-full object-cover" />
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium shadow-lg">
                      {{ project.musicalGenre }}
                    </span>
                    @if (project.projectType) {
                      <span class="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-lg">
                        {{ project.projectType }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Conteúdo -->
                <div class="p-8">
                  <!-- Título e Autor -->
                  <div class="mb-6">
                    <h1 class="text-4xl font-bold text-gray-900 mb-3">{{ project.title }}</h1>
                    <div class="flex items-center gap-3 text-gray-600">
                      <div class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500">Publicado por</p>
                          <p class="font-semibold text-gray-900">{{ project.author.name }}</p>
                        </div>
                      </div>
                      <span class="text-gray-300">•</span>
                      <div class="flex items-center gap-1 text-sm">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        {{ formatDate(project.createdAt) }}
                      </div>
                    </div>
                  </div>

                  <!-- Descrição -->
                  <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                      </svg>
                      Sobre o Projeto
                    </h2>
                    <p class="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{{ project.description }}</p>
                  </div>

                  <!-- Requisitos -->
                  @if (project.requirements) {
                    <div class="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>
                        Requisitos
                      </h2>
                      <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ project.requirements }}</p>
                    </div>
                  }

                  <!-- Estatísticas -->
                  <div class="flex items-center gap-6 pt-6 border-t border-gray-200">
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      <span class="font-medium">{{ project.likes }} curtidas</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                      </svg>
                      <span class="font-medium">{{ project.views }} visualizações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar (1/3) -->
            <div class="space-y-6">
              <!-- Card de Contato - DESTAQUE -->
              @if (project.contactPhone) {
                <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-xl p-6 text-white sticky top-6">
                  <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Entre em Contato</h3>
                    <p class="text-indigo-100 text-sm mb-4">Interessado? Ligue ou envie WhatsApp</p>
                  </div>

                  <a [href]="'tel:' + project.contactPhone" 
                     class="block w-full bg-white text-indigo-600 text-center py-3 px-4 rounded-lg font-bold text-lg mb-3 hover:bg-indigo-50 transition-colors">
                    📞 {{ formatPhone(project.contactPhone) }}
                  </a>

                  <a [href]="'https://wa.me/' + cleanPhone(project.contactPhone)" 
                     target="_blank"
                     class="flex w-full bg-green-500 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chamar no WhatsApp
                  </a>
                </div>
              }

              <!-- Card de Informações -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Informações do Projeto
                </h3>

                <div class="space-y-4">
                  @if (project.budget) {
                    <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <div>
                        <p class="text-xs font-medium text-green-700 mb-1">Orçamento</p>
                        <p class="text-lg font-bold text-green-900">
                          R$ {{ project.budget.min }} - R$ {{ project.budget.max }}
                        </p>
                      </div>
                    </div>
                  }

                  @if (project.duration) {
                    <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <div>
                        <p class="text-xs font-medium text-blue-700 mb-1">Duração Estimada</p>
                        <p class="font-semibold text-blue-900">{{ project.duration }}</p>
                      </div>
                    </div>
                  }

                  @if (project.location?.city) {
                    <div class="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <svg class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <div>
                        <p class="text-xs font-medium text-purple-700 mb-1">Localização</p>
                        <p class="font-semibold text-purple-900">
                          {{ project.location?.city }}@if (project.location?.state) {, {{ project.location?.state }}}
                        </p>
                      </div>
                    </div>
                  }

                  @if (project.deadline) {
                    <div class="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <p class="text-xs font-medium text-red-700 mb-1">Prazo</p>
                        <p class="font-semibold text-red-900">{{ formatDeadline(project.deadline) }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Card de Ações -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Ações</h3>
                <div class="space-y-3">
                  @if (project.contactPhone) {
                    <button (click)="showContactInfo()" 
                            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Entrar em Contato
                    </button>
                  }
                  <button (click)="shareProject()" 
                          class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </main>

    <app-footer></app-footer>
  `
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(id);
    }
  }

  loadProject(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar projeto:', error);
        this.isLoading = false;
        this.router.navigate(['/find-jobs']);
      }
    });
  }

  saveProject(): void {
    if (this.project) {
      this.projectService.saveProject(this.project._id).subscribe({
        next: (response) => {
          if (this.project) {
            this.project.saves = response.saves;
          }
          alert('Projeto salvo com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao salvar projeto:', error);
          alert('Erro ao salvar projeto. Tente novamente.');
        }
      });
    }
  }

  showContactInfo(): void {
    if (this.project && this.project.contactPhone) {
      const formattedPhone = this.formatPhone(this.project.contactPhone);
      const message = `📞 Telefone do Freelancer:\n\n${formattedPhone}\n\nDeseja entrar em contato?`;
      
      if (confirm(message)) {
        // Scroll suave até o card de contato no topo
        const contactCard = document.querySelector('.sticky');
        if (contactCard) {
          contactCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  shareProject(): void {
    if (navigator.share && this.project) {
      navigator.share({
        title: this.project.title,
        text: this.project.description,
        url: window.location.href
      }).catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  }

  goBack(): void {
    this.router.navigate(['/find-jobs']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Publicado hoje';
    if (days === 1) return 'Publicado ontem';
    if (days < 7) return `Publicado há ${days} dias`;
    if (days < 30) return `Publicado há ${Math.floor(days / 7)} semanas`;
    return `Publicado em ${d.toLocaleDateString('pt-BR')}`;
  }

  formatDeadline(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  formatPhone(phone: string): string {
    // Formatar telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  cleanPhone(phone: string): string {
    // Remove tudo exceto números para WhatsApp
    return phone.replace(/\D/g, '');
  }
}
