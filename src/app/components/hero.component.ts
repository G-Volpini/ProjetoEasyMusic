import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative bg-gradient-hero overflow-hidden">
      <div class="max-w-[1860px] mx-auto px-6 py-20">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <!-- Left decorative images -->
          <div class="hidden lg:block w-[396px] opacity-50 relative h-[576px]">
            <div class="absolute left-0 top-9 w-36 h-36 rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/7444e8c2b8ad2a5e7f06daec033cb6c7c728de82?width=1000" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-[180px] top-0 w-[108px] h-[108px] rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad2a399cfe528eab9c8103f16d8111322b0556e9?width=574" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-9 top-[216px] w-[108px] h-[108px] rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/067d75f97119b10853767c89ca0442a00c7d873f?width=792" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-[180px] top-36 w-[180px] h-[180px] rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/105875747d517e8590a9f92bd39fd334b6bf5c83?width=1000" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-9 top-[360px] w-[180px] h-[180px] rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/43fec6656f6a0fd2612fcfe17a8403874efc43b3?width=1000" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
            <div class="absolute left-[252px] top-[360px] w-36 h-36 rounded-xl overflow-hidden">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/48d98e85b46df11c4917a93d8e228e7126a07175?width=1000" 
                   alt="" 
                   class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Center content -->
          <div class="flex-1 max-w-[1096px] text-center px-4">
            <h1 class="text-5xl md:text-[80px] leading-tight md:leading-[68px] tracking-[-4px] mb-6">
              <span class="text-dark">Os </span>
              <span class="text-primary">melhores músicos </span>
              <span class="text-dark">da cidade estão no EasyMusic</span>
            </h1>
            
            <p class="text-dark text-xl leading-[30px] tracking-[-0.4px] max-w-[550px] mx-auto mb-8">
              Uma plataforma completa que conecta contratantes e músicos, tornando mais fácil descobrir talentos, inspirar-se e fechar parcerias incríveis.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button class="px-7 py-3 bg-secondary text-white text-base rounded-full hover:opacity-90 transition-opacity">
                Contratar um músico
              </button>
              <button class="px-7 py-3 bg-blue-bg text-secondary text-base rounded-full border border-blue-light hover:bg-blue-light transition-colors">
                Cadastrar meu perfil
              </button>
            </div>
          </div>

          <!-- Right decorative gradient -->
          <div class="hidden lg:block w-[396px] opacity-50 relative h-[576px]">
            <svg class="absolute right-0" width="209" height="577" viewBox="0 0 209 577" fill="none">
              <g opacity="0.5">
                <circle cx="167.5" cy="405.5" r="117.5" fill="#1F5ACE" fill-opacity="0.42"/>
                <circle cx="173.55" cy="198.875" r="66.5" fill="#116CAF" fill-opacity="0.62"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
