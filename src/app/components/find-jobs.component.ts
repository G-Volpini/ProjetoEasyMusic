import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';

@Component({
    selector: 'app-find-jobs',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        FooterComponent
    ],
    template: `
    <div class="min-h-screen bg-white">
        <app-header></app-header>

        <!-- Hero Banner -->
        <section class="relative bg-cover bg-center h-[270px]"
            style="background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/f31223594b21f6311fb7d33ac566b1e0d99252ce?width=3720')">
            <div class="absolute inset-0 bg-black bg-opacity-45"></div>
            <div class="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                <h1 class="text-5xl md:text-[65px] font-normal tracking-tight mb-4">Trabalhos Disponíveis</h1>
                <p class="text-xl md:text-[22px] font-normal">
                    @if (isLoggedIn()) {
                        Encontre oportunidades musicais perfeitas para você!
                    } @else {
                        Faça login para publicar e se candidatar a trabalhos
                    }
                </p>
            </div>
        </section>

        <!-- Modal Novo Projeto -->
        @if (showNewJobModal) {
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" (click)="closeModal($event)">
                <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
                    <div class="p-6 border-b">
                        <h2 class="text-2xl font-bold">Publicar Novo Trabalho</h2>
                    </div>
                    
                    <form (ngSubmit)="onSubmitJob()" class="p-6 space-y-4">
                        @if (jobError) {
                            <div class="p-3 bg-red-100 text-red-700 rounded">{{ jobError }}</div>
                        }

                        <div>
                            <label class="block text-sm font-medium mb-1">Título *</label>
                            <input type="text" [(ngModel)]="newJob.title" name="title" required
                                   class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Descrição *</label>
                            <textarea [(ngModel)]="newJob.description" name="description" rows="4" required
                                      class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">URL da Imagem (opcional)</label>
                            <input type="url" [(ngModel)]="newJob.imageUrl" name="imageUrl" placeholder="https://exemplo.com/imagem.jpg"
                                   class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            <p class="text-xs text-gray-500 mt-1">Se não informar, será usada uma imagem padrão</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Telefone para Contato *</label>
                            <input type="tel" [(ngModel)]="newJob.contactPhone" name="contactPhone" required placeholder="(15) 98765-4321"
                                   class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Gênero Musical *</label>
                                <select [(ngModel)]="newJob.musicalGenre" name="musicalGenre" required
                                        class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione...</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Sertanejo">Sertanejo</option>
                                    <option value="MPB">MPB</option>
                                    <option value="Eletrônica">Eletrônica</option>
                                    <option value="Hip Hop">Hip Hop</option>
                                    <option value="Clássica">Clássica</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-1">Tipo de Projeto *</label>
                                <select [(ngModel)]="newJob.projectType" name="projectType" required
                                        class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione...</option>
                                    <option value="Gravação">Gravação</option>
                                    <option value="Show ao vivo">Show ao vivo</option>
                                    <option value="Produção">Produção</option>
                                    <option value="Mixagem">Mixagem</option>
                                    <option value="Composição">Composição</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Orçamento Mínimo (R$)</label>
                                <input type="number" [(ngModel)]="newJob.budget.min" name="budgetMin" min="0"
                                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Orçamento Máximo (R$)</label>
                                <input type="number" [(ngModel)]="newJob.budget.max" name="budgetMax" min="0"
                                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Cidade</label>
                                <input type="text" [(ngModel)]="newJob.location.city" name="city"
                                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Estado</label>
                                <input type="text" [(ngModel)]="newJob.location.state" name="state"
                                       class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Duração</label>
                            <input type="text" [(ngModel)]="newJob.duration" name="duration" placeholder="Ex: 3 meses"
                                   class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">Prazo</label>
                            <input type="date" [(ngModel)]="newJob.deadline" name="deadline"
                                   class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" (click)="closeNewJobModal()" 
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button type="submit" [disabled]="isSubmitting"
                                    class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
                                {{ isSubmitting ? 'Publicando...' : 'Publicar Trabalho' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        }

        <!-- Main Content -->
        <div class="flex">
            <!-- Sidebar -->
            <aside class="w-[330px] border-r border-gray-200 p-6 flex-shrink-0">
                @if (isLoggedIn()) {
                    <button (click)="openNewJobModal()"
                        class="w-full bg-indigo-600 text-white rounded-full px-5 py-2 flex items-center justify-center gap-2 mb-5 hover:bg-indigo-700 transition-colors">
                        <svg class="w-4 h-4" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 1C7.41775 1 5.87103 1.46919 4.55544 2.34824C3.23985 3.22729 2.21447 4.47672 1.60897 5.93853C1.00347 7.40034 0.84504 9.00887 1.15372 10.5607C1.4624 12.1126 2.22433 13.538 3.34315 14.6569C4.46197 15.7757 5.88743 16.5376 7.43928 16.8463C8.99113 17.155 10.5997 16.9965 12.0615 16.391C13.5233 15.7855 14.7727 14.7602 15.6518 13.4446C16.5308 12.129 17 10.5823 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1ZM14 9.5C14 9.63261 13.9473 9.75979 13.8536 9.85355C13.7598 9.94732 13.6326 10 13.5 10H10V13.5C10 13.6326 9.94733 13.7598 9.85356 13.8536C9.75979 13.9473 9.63261 14 9.5 14H8.5C8.3674 14 8.24022 13.9473 8.14645 13.8536C8.05268 13.7598 8 13.6326 8 13.5V10H4.5C4.3674 10 4.24022 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V8.5C4 8.36739 4.05268 8.24021 4.14645 8.14645C4.24022 8.05268 4.3674 8 4.5 8H8V4.5C8 4.36739 8.05268 4.24021 8.14645 4.14645C8.24022 4.05268 8.3674 4 8.5 4H9.5C9.63261 4 9.75979 4.05268 9.85356 4.14645C9.94733 4.24021 10 4.36739 10 4.5V8H13.5C13.6326 8 13.7598 8.05268 13.8536 8.14645C13.9473 8.24021 14 8.36739 14 8.5V9.5Z"
                                fill="white" />
                        </svg>
                        <span class="text-sm">Publicar Trabalho</span>
                    </button>
                } @else {
                    <button (click)="goToLogin()"
                        class="w-full bg-gray-600 text-white rounded-full px-5 py-2 flex items-center justify-center gap-2 mb-5 hover:bg-gray-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <span class="text-sm">Login para Publicar</span>
                    </button>
                }

                <!-- Filtros -->
                <div class="border-t border-gray-200 pt-5">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold">Filtrar por</h3>
                        @if (hasActiveFilters()) {
                            <button (click)="clearFilters()" 
                                    class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                Limpar tudo
                            </button>
                        }
                    </div>
                    
                    <!-- Busca -->
                    <div class="mb-4">
                        <div class="relative">
                            <input type="text" 
                                   [(ngModel)]="searchTerm" 
                                   (input)="applyFilters()" 
                                   placeholder="Buscar trabalhos..."
                                   class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>

                    <!-- Gênero -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Gênero Musical</label>
                        <select [(ngModel)]="selectedGenre" (change)="applyFilters()"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option value="">Todos</option>
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Sertanejo">Sertanejo</option>
                            <option value="MPB">MPB</option>
                            <option value="Eletrônica">Eletrônica</option>
                            <option value="Hip Hop">Hip Hop</option>
                            <option value="Clássica">Clássica</option>
                        </select>
                    </div>

                    <!-- Tipo -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Tipo de Projeto</label>
                        <select [(ngModel)]="selectedType" (change)="applyFilters()"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option value="">Todos</option>
                            <option value="Gravação">Gravação</option>
                            <option value="Show ao vivo">Show ao vivo</option>
                            <option value="Produção">Produção</option>
                            <option value="Mixagem">Mixagem</option>
                            <option value="Composição">Composição</option>
                        </select>
                    </div>

                    <!-- Cidade -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Cidade</label>
                        <div class="relative">
                            <input type="text" 
                                   [(ngModel)]="selectedCity" 
                                   (input)="applyFilters()" 
                                   placeholder="Qualquer cidade"
                                   class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                    </div>

                    <!-- Botão Aplicar Filtros -->
                    @if (hasActiveFilters()) {
                        <div class="mt-4 p-3 bg-indigo-50 rounded-md">
                            <p class="text-xs text-indigo-900 font-medium">
                                {{ getActiveFiltersCount() }} filtro(s) ativo(s)
                            </p>
                        </div>
                    }
                </div>
            </aside>

            <!-- Jobs Grid -->
            <main class="flex-1 p-6">
                <!-- Call to Action para usuários não logados -->
                @if (!isLoggedIn()) {
                    <div class="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-10 text-white animate-gradient">
                        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div class="flex-1 text-center md:text-left space-y-4">
                                <div class="inline-block">
                                    <span class="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                        🎵 Plataforma #1 do Brasil
                                    </span>
                                </div>
                                <h2 class="text-3xl md:text-4xl font-bold leading-tight">
                                    Faça login para trabalhar na maior plataforma Musical do mercado!
                                </h2>
                                <p class="text-lg md:text-xl text-white/90">
                                    Publique seus trabalhos, candidate-se a oportunidades e conecte-se com músicos profissionais de todo o Brasil.
                                </p>
                                <div class="grid md:grid-cols-2 gap-3 pt-2">
                                    <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        <div>
                                            <p class="font-semibold">Publique Gratuitamente</p>
                                            <p class="text-sm text-white/80">Trabalhos ilimitados sem custo</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        <div>
                                            <p class="font-semibold">Candidate-se</p>
                                            <p class="text-sm text-white/80">Oportunidades musicais diárias</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        <div>
                                            <p class="font-semibold">Contato Direto</p>
                                            <p class="text-sm text-white/80">Fale com profissionais</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        <div>
                                            <p class="font-semibold">Seguro e Confiável</p>
                                            <p class="text-sm text-white/80">Perfis verificados</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-shrink-0 text-center">
                                <a (click)="goToLogin()" style="cursor: pointer;"
                                    class="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 mb-4 w-full md:w-auto justify-center group">
                                    <svg class="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                    </svg>
                                    Fazer Login Agora
                                </a>
                                <div class="text-white/90 text-base">
                                    Não tem conta? 
                                    <a (click)="goToRegister()" style="cursor: pointer;" class="underline font-bold hover:text-white transition-colors ml-1">
                                        Cadastre-se grátis aqui
                                    </a>
                                </div>
                                <p class="text-sm text-white/70 mt-3">✨ Junte-se a milhares de músicos</p>
                            </div>
                        </div>
                    </div>
                }

                <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-bold">
                            {{ filteredProjects.length }} trabalho{{ filteredProjects.length !== 1 ? 's' : '' }} encontrado{{ filteredProjects.length !== 1 ? 's' : '' }}
                        </h2>
                        @if (hasActiveFilters()) {
                            <p class="text-sm text-gray-500 mt-1">
                                Mostrando resultados filtrados de {{ projects.length }} trabalhos totais
                            </p>
                        }
                    </div>
                    <select [(ngModel)]="sortBy" (change)="applySort()"
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="-createdAt">Mais recentes primeiro</option>
                        <option value="createdAt">Mais antigos primeiro</option>
                        <option value="budget">Menor orçamento</option>
                        <option value="-budget">Maior orçamento</option>
                        <option value="title">Título (A-Z)</option>
                        <option value="-title">Título (Z-A)</option>
                    </select>
                </div>

                @if (isLoading) {
                    <div class="text-center py-20">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p class="text-gray-600 mt-4">Carregando trabalhos...</p>
                    </div>
                } @else if (filteredProjects.length === 0) {
                    <div class="text-center py-20">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p class="text-gray-600 mt-4 text-lg">Nenhum trabalho encontrado.</p>
                        @if (hasActiveFilters()) {
                            <button (click)="clearFilters()" 
                                    class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                Limpar filtros e ver todos
                            </button>
                        }
                    </div>
                } @else {
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @for (project of filteredProjects; track project._id) {
                            <div (click)="viewProject(project._id)" 
                                 class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 duration-200">
                                
                                <!-- Imagem do Projeto -->
                                @if (project.imageUrl) {
                                    <div class="mb-3 rounded-lg overflow-hidden">
                                        <img [src]="project.imageUrl" 
                                             [alt]="project.title"
                                             class="w-full h-40 object-cover">
                                    </div>
                                }
                                
                                <div class="flex justify-between items-start mb-3">
                                    <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">{{ project.title }}</h3>
                                    <span class="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full whitespace-nowrap ml-2">
                                        {{ project.musicalGenre }}
                                    </span>
                                </div>
                                
                                <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ project.description }}</p>
                                
                                <div class="space-y-2 text-sm text-gray-500">
                                    @if (project.budget) {
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span class="font-medium text-gray-700">R$ {{ project.budget.min }} - R$ {{ project.budget.max }}</span>
                                        </div>
                                    }
                                    @if (project.location?.city) {
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            <span>{{ project.location?.city }}{{ project.location?.state ? ', ' + project.location?.state : '' }}</span>
                                        </div>
                                    }
                                    @if (project.projectType) {
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                            </svg>
                                            <span>{{ project.projectType }}</span>
                                        </div>
                                    }
                                    @if (project.duration) {
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span>{{ project.duration }}</span>
                                        </div>
                                    }
                                </div>
                                
                                <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                        </svg>
                                        {{ project.author.name }}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                        </svg>
                                        {{ formatDate(project.createdAt) }}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                }
            </main>
        </div>

        <app-footer></app-footer>
    </div>
    `,
    styles: []
})
export class FindJobsComponent implements OnInit {
    projects: Project[] = [];
    filteredProjects: Project[] = [];
    isLoading = false;
    
    // Filtros
    searchTerm = '';
    selectedGenre = '';
    selectedType = '';
    selectedCity = '';
    sortBy = '-createdAt';
    
    // Modal novo trabalho
    showNewJobModal = false;
    isSubmitting = false;
    jobError = '';
    newJob: any = {
        title: '',
        description: '',
        musicalGenre: '',
        projectType: '',
        budget: { min: 0, max: 0 },
        location: { city: '', state: '' },
        duration: '',
        deadline: '',
        imageUrl: '',
        contactPhone: ''
    };

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects(): void {
        this.isLoading = true;
        this.projectService.getProjects().subscribe({
            next: (response: any) => {
                this.projects = response.projects || [];
                this.filteredProjects = [...this.projects];
                this.applySort();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar projetos:', error);
                this.isLoading = false;
            }
        });
    }

    applyFilters(): void {
        this.filteredProjects = this.projects.filter(project => {
            const matchSearch = !this.searchTerm || 
                project.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                project.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
            
            const matchGenre = !this.selectedGenre || project.musicalGenre === this.selectedGenre;
            const matchType = !this.selectedType || project.projectType === this.selectedType;
            const matchCity = !this.selectedCity || 
                project.location?.city?.toLowerCase().includes(this.selectedCity.toLowerCase());
            
            return matchSearch && matchGenre && matchType && matchCity;
        });
        
        this.applySort();
    }

    applySort(): void {
        this.filteredProjects.sort((a, b) => {
            switch (this.sortBy) {
                case '-createdAt':
                    return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
                case 'createdAt':
                    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
                case 'budget':
                    return (a.budget?.min || 0) - (b.budget?.min || 0);
                case '-budget':
                    return (b.budget?.max || 0) - (a.budget?.max || 0);
                case 'title':
                    return a.title.localeCompare(b.title);
                case '-title':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    hasActiveFilters(): boolean {
        return !!(this.searchTerm || this.selectedGenre || this.selectedType || this.selectedCity);
    }

    getActiveFiltersCount(): number {
        let count = 0;
        if (this.searchTerm) count++;
        if (this.selectedGenre) count++;
        if (this.selectedType) count++;
        if (this.selectedCity) count++;
        return count;
    }

    clearFilters(): void {
        this.searchTerm = '';
        this.selectedGenre = '';
        this.selectedType = '';
        this.selectedCity = '';
        this.applyFilters();
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    goToLogin(): void {
        console.log('Navegando para login...');
        this.router.navigate(['/login']);
    }

    goToRegister(): void {
        console.log('Navegando para registro...');
        this.router.navigate(['/register']);
    }

    openNewJobModal(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.showNewJobModal = true;
    }

    closeNewJobModal(): void {
        this.showNewJobModal = false;
        this.jobError = '';
        this.resetNewJob();
    }

    closeModal(event: Event): void {
        this.closeNewJobModal();
    }

    resetNewJob(): void {
        this.newJob = {
            title: '',
            description: '',
            musicalGenre: '',
            projectType: '',
            budget: { min: 0, max: 0 },
            location: { city: '', state: '' },
            duration: '',
            deadline: '',
            imageUrl: '',
            contactPhone: ''
        };
    }

    getDefaultImage(genre: string): string {
        const defaultImages: { [key: string]: string } = {
            'Pop': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
            'Rock': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800',
            'Jazz': 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
            'Sertanejo': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
            'MPB': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800',
            'Eletrônica': 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
            'Hip Hop': 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800',
            'Clássica': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800'
        };
        return defaultImages[genre] || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800';
    }

    onSubmitJob(): void {
        this.jobError = '';
        
        if (!this.newJob.title || !this.newJob.description || !this.newJob.musicalGenre || !this.newJob.projectType || !this.newJob.contactPhone) {
            this.jobError = 'Preencha todos os campos obrigatórios';
            return;
        }

        // Pegar o usuário do localStorage
        const userStr = localStorage.getItem('easymusic_user');
        const user = userStr ? JSON.parse(userStr) : null;

        // Se não tiver imagem, usar imagem padrão baseada no gênero
        const imageUrl = this.newJob.imageUrl || this.getDefaultImage(this.newJob.musicalGenre);
        
        this.isSubmitting = true;
        this.projectService.createProject({
            ...this.newJob,
            imageUrl,
            authorId: user?.id,
            authorName: user?.name
        }).subscribe({
            next: () => {
                this.isSubmitting = false;
                this.closeNewJobModal();
                this.loadProjects();
            },
            error: (error) => {
                this.isSubmitting = false;
                this.jobError = 'Erro ao publicar trabalho. Tente novamente.';
                console.error('Erro:', error);
            }
        });
    }

    viewProject(id?: string): void {
        if (id) {
            this.router.navigate(['/project', id]);
        }
    }

    formatDate(date: any): string {
        if (!date) return '';
        const d = new Date(date);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) return 'Hoje';
        if (days === 1) return 'Ontem';
        if (days < 7) return `${days} dias atrás`;
        if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
        return d.toLocaleDateString('pt-BR');
    }
}