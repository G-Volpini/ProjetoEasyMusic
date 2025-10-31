import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white border-b border-gray-lightest sticky top-0 z-50">
      <div class="max-w-[1860px] mx-auto px-6 h-[55px] flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-6">
          <a [routerLink]="['/']" class="flex items-center gap-2">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/b474263f8dbd55c7cadd7c40ba9e03b992c12b1b?width=164" 
                 alt="EasyMusic" 
                 class="h-[55px] w-auto" />
          </a>
          
          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6 ml-8">
            <a [routerLink]="['/']" routerLinkActive="border-b-2 border-dark pb-1" [routerLinkActiveOptions]="{exact: true}" class="text-dark text-base font-normal hover:opacity-80 transition-opacity">
              Explorar
            </a>
            <a [routerLink]="['/find-jobs']" routerLinkActive="border-b-2 border-dark pb-1" class="text-dark text-base font-normal hover:opacity-80 transition-opacity">
              Encontrar trabalhos
            </a>
            <a [routerLink]="['/hire-freelancers']" routerLinkActive="border-b-2 border-dark pb-1" class="text-dark text-base font-normal hover:opacity-80 transition-opacity">
              Contratar freelancers
            </a>
          </nav>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <button class="hidden md:block px-5 py-1.5 bg-gradient-purple text-white text-sm rounded-full hover:opacity-90 transition-opacity">
            Experimente grátis
          </button>
          <a [routerLink]="['/login']" class="px-5 py-2 bg-blue-bg text-primary text-sm rounded-full border border-blue-light hover:bg-blue-light transition-colors">
            Fazer logon
          </a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
