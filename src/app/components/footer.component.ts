import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dark border-t border-gray">
      <div class="max-w-[1460px] mx-auto px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <!-- Logo -->
          <div class="lg:col-span-1">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/c3c340816c3865502f82cd63b20ae4af7264f06a?width=320" 
                 alt="EasyMusic" 
                 class="h-14 w-auto" />
          </div>

          <!-- Descubra oportunidades -->
          <div>
            <h3 class="text-white text-base font-normal mb-10">Descubra oportunidades</h3>
            <ul class="space-y-4.5">
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Cadastre seu perfil</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Seja contratado</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Venda serviços musicais</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Publique seus projetos</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Explore inspirações</a></li>
            </ul>
          </div>

          <!-- Encontre talentos -->
          <div>
            <h3 class="text-white text-base font-normal mb-10">Encontre talentos</h3>
            <ul class="space-y-4.5">
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Publicar uma vaga</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Músicos e bandas</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">DJs e produtores</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Técnicos de som</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Compositores e letristas</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Instrutores de música</a></li>
            </ul>
          </div>

          <!-- EasyMusic -->
          <div>
            <h3 class="text-white text-base font-normal mb-10">EasyMusic</h3>
            <ul class="space-y-4.5">
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Sobre a EasyMusic</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Como funciona</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Blog e novidades</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Blog</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Ajuda e suporte</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Centro de Ajuda</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Fale conosco</a></li>
              <li><a href="#" class="text-white text-base hover:opacity-80 transition-opacity">Termos e privacidade</a></li>
            </ul>
          </div>

          <!-- Social -->
          <div>
            <h3 class="text-white text-base font-normal mb-10">Social</h3>
            <ul class="space-y-4.5">
              <li>
                <a href="#" class="flex items-center gap-2.5 text-white text-base hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.5 3.5C3.5 3.5 0.5 8.5 0.5 8.5C0.5 8.5 3.5 13.5 8.5 13.5C13.5 13.5 16.5 8.5 16.5 8.5C16.5 8.5 13.5 3.5 8.5 3.5ZM8.5 10.5C7.395 10.5 6.5 9.604 6.5 8.5C6.5 7.394 7.395 6.5 8.5 6.5C9.604 6.5 10.5 7.394 10.5 8.5C10.5 9.604 9.604 10.5 8.5 10.5Z" fill="#CCCCCC"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2.5 text-white text-base hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#CCCCCC"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2.5 text-white text-base hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#CCCCCC"/>
                  </svg>
                  Pinterest
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2.5 text-white text-base hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#CCCCCC"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center gap-2.5 text-white text-base hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#CCCCCC"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Separator -->
        <div class="h-px bg-gray mb-8"></div>

        <!-- Bottom -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white text-[13px]">© 2025 EasyMusic Inc. All rights reserved.</p>
          <div class="flex flex-wrap items-center gap-6 text-gray text-[11px]">
            <a href="#" class="hover:text-white transition-colors">Termos de uso</a>
            <a href="#" class="hover:text-white transition-colors">Privacidade</a>
            <a href="#" class="hover:text-white transition-colors">Comunidade</a>
            <a href="#" class="hover:text-white transition-colors">Preferências de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
