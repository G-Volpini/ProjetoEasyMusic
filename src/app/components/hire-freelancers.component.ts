import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-hire-freelancers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-white to-grey-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto pt-16 pb-24 border-b border-grey-88">
        <div class="text-center">
          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl lg:text-[70px] font-normal leading-tight lg:leading-[68px] tracking-tight lg:tracking-[-2.1px] text-grey-10 mb-7 max-w-[849px] mx-auto">
            Contrate os melhores músicos da sua região no EasyMusic
          </h1>

          <!-- Subtitle -->
          <p class="text-base sm:text-lg text-grey-10 tracking-[-0.54px] leading-6 mb-10 max-w-[1000px] mx-auto px-4">
            Esqueça a busca complicada. Encontre artistas de forma rápida e inteligente com base no seu estilo, orçamento e localização.
          </p>

          <!-- Search Bar -->
          <div class="max-w-[800px] mx-auto mb-10">
            <div class="bg-white border border-grey-88 rounded-full shadow-primary-sm p-1 flex items-center gap-2">
              <div class="bg-grey-5 rounded-full px-4 py-2">
                <span class="text-primary text-base font-normal">Estou procurando</span>
              </div>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Estou procurando um cantor para evento corporativo em Sorocaba, orçamento de R$ 2.000"
                class="flex-1 bg-transparent text-primary text-base outline-none placeholder:text-primary placeholder:opacity-70"
              />
              <button (click)="onSearch()" class="w-10 h-10 rounded-full bg-gradient-to-r from-primary via-primary-dark to-primary-darker opacity-20 hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="white" viewBox="0 0 15 15">
                  <path d="M4.47246 15.0019C4.56667 15.0011 4.66048 14.9902 4.75241 14.9695C4.84268 14.9485 4.93173 14.9224 5.0191 14.8914C5.10552 14.8598 5.18791 14.8182 5.26475 14.7676C5.34981 14.7132 5.4285 14.6493 5.49913 14.5772L11.5486 8.5276C11.678 8.38556 11.7835 8.22349 11.861 8.04764C11.935 7.8789 11.9733 7.69665 11.9734 7.51239C11.9729 7.32448 11.9346 7.13861 11.861 6.96574C11.7884 6.79009 11.6823 6.63027 11.5486 6.49525L5.49913 0.447596C5.36348 0.307347 5.19994 0.197078 5.0191 0.123818C4.84864 0.0567369 4.66703 0.0224676 4.48385 0.0228491C4.29706 0.0234985 4.11192 0.0577097 3.93721 0.123818C3.75683 0.191701 3.59585 0.302871 3.46858 0.447596C3.33447 0.581576 3.22829 0.740849 3.15619 0.916171C3.08223 1.08492 3.04412 1.26718 3.04412 1.45142C3.04412 1.63566 3.08223 1.81792 3.15619 1.98667C3.22829 2.16199 3.33447 2.32126 3.46858 2.45525L8.5124 7.50093L3.46858 12.5676C3.33447 12.7016 3.22829 12.8609 3.15619 13.0362C3.08196 13.2052 3.04365 13.3878 3.04365 13.5724C3.04365 13.757 3.08196 13.9396 3.15619 14.1086C3.22924 14.2834 3.33531 14.4425 3.46858 14.5772C3.53698 14.6472 3.61158 14.7109 3.69144 14.7676C3.76675 14.8208 3.84962 14.8626 3.93721 14.8914C4.02673 14.92 4.11624 14.9467 4.20576 14.9695C4.2931 14.9906 4.38262 15.0015 4.47246 15.0019Z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Terms -->
          <div class="text-sm text-grey-10 leading-[16.9px]">
            Ao usar o Behance, você concorda com os 
            <a href="#" class="underline">Termos de uso</a> e a 
            <a href="#" class="underline">Política de privacidade</a> da Adobe.
          </div>
        </div>

        <!-- Categories Grid -->
        <div class="mt-14">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            @for (category of categories; track category.title) {
              <div class="rounded-xl overflow-hidden h-[262px] relative group cursor-pointer">
                <img [src]="category.image" [alt]="category.title" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-[#010E27]/80 flex items-center justify-center">
                  <h3 class="text-white text-lg font-normal text-center px-8">{{ category.title }}</h3>
                </div>
              </div>
            }
          </div>

          <!-- View All Categories -->
          <div class="mt-8 text-center">
            <button class="border border-grey-91 bg-white rounded-full px-7 py-3 text-grey-10 text-base hover:border-grey-10 transition-colors">
              Pesquisar todas as categorias
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Hire Section -->
    <section class="bg-gradient-to-b from-grey-2 to-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-24 border-b border-grey-88">
        <div class="flex flex-col lg:flex-row gap-12 items-center">
          <!-- Left Content -->
          <div class="flex-1 max-w-[775px]">
            <h2 class="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.8px] text-grey-10 mb-7">
              Por que contratar no EasyMusic?
            </h2>
            <p class="text-lg text-grey-10 tracking-[-0.54px] leading-6 mb-12">
              A forma mais prática de encontrar os artistas perfeitos para seu projeto.
            </p>

            <!-- Benefits List -->
            <div class="space-y-7">
              @for (benefit of benefits; track benefit.title) {
                <div class="flex gap-5">
                  <div class="flex-shrink-0 w-7 pt-1">
                    @if (benefit.icon === 'sparkles') {
                      <svg class="w-7 h-11" viewBox="0 0 27 44" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.58982 13.7012C9.91893 13.7012 10.2066 13.9234 10.2896 14.2419C10.9645 16.8291 11.7331 18.5368 12.9517 19.8315C14.1726 21.1286 15.9141 22.0843 18.6874 23.0189C18.9816 23.118 19.1796 23.3938 19.1796 23.7042C19.1796 24.0146 18.9816 24.2904 18.6874 24.3895C15.9141 25.3241 14.1726 26.2798 12.9517 27.5771C11.7331 28.8717 10.9645 30.5794 10.2896 33.1667C10.2066 33.4852 9.91893 33.7073 9.58982 33.7073C9.2607 33.7073 8.97308 33.4852 8.89002 33.1667C8.21517 30.5794 7.44648 28.8717 6.22796 27.5771C5.00706 26.2798 3.26555 25.3241 0.492261 24.3895C0.198093 24.2904 -2.81626e-06 24.0146 0 23.7042C2.81638e-06 23.3938 0.198104 23.118 0.492274 23.0189C3.26556 22.0843 5.00706 21.1286 6.22796 19.8315C7.44648 18.5368 8.21517 16.8291 8.89002 14.2419C8.97308 13.9234 9.2607 13.7012 9.58982 13.7012Z" fill="#0057FF"/>
                      </svg>
                    } @else if (benefit.icon === 'tools') {
                      <svg class="w-7 h-11" viewBox="0 0 27 44" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.899902 12.184C0.899902 10.6513 2.15116 9.40002 3.6839 9.40002H13.3853C13.7581 9.40002 14.0603 9.70224 14.0603 10.075V33.8013C14.0603 34.1741 13.7581 34.4763 13.3853 34.4763H3.6839C2.15116 34.4763 0.899902 33.225 0.899902 31.6923V12.184Z" fill="#0057FF"/>
                      </svg>
                    } @else if (benefit.icon === 'payment') {
                      <svg class="w-7 h-11" viewBox="0 0 27 44" fill="none">
                        <path d="M22.7572 17.7922V11.0597C22.7572 10.6133 22.5799 10.1852 22.2643 9.86956C21.9486 9.55391 21.5205 9.37659 21.0741 9.37659H2.55983C2.11344 9.37659 1.68533 9.55391 1.36968 9.86956C1.05404 10.1852 0.876709 10.6133 0.876709 11.0597V24.5246C0.876709 24.971 1.05404 25.3991 1.36968 25.7148C1.68533 26.0304 2.11344 26.2078 2.55983 26.2078H12.6585" stroke="#0057FF" stroke-width="1.4"/>
                      </svg>
                    } @else {
                      <svg class="w-7 h-11" viewBox="0 0 27 44" fill="none">
                        <circle cx="13.5" cy="22" r="10" fill="#0057FF"/>
                      </svg>
                    }
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="text-grey-10 text-[15px] font-normal leading-[15px] tracking-[-0.3px]">
                        {{ benefit.title }}
                      </h3>
                      @if (benefit.badge) {
                        <span class="bg-gradient-to-r from-primary via-primary-dark to-primary-darker text-white text-xs uppercase px-2 py-0.5 rounded">
                          {{ benefit.badge }}
                        </span>
                      }
                    </div>
                    <p class="text-grey-44 text-[15px] font-normal leading-[21px] tracking-[-0.3px]">
                      {{ benefit.description }}
                    </p>
                  </div>
                </div>
              }
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start mt-12">
              <button class="bg-primary text-white rounded-full px-8 py-3 text-base hover:bg-primary-dark transition-colors">
                Começar
              </button>
              <button class="border border-grey-91 bg-white text-grey-10 rounded-full px-7 py-3 text-base hover:border-grey-10 transition-colors">
                Procurar músicos
              </button>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex-shrink-0 w-full lg:w-[425px]">
            <img 
              src="https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=850" 
              alt="Musicians" 
              class="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Musicians Section -->
    <section class="bg-gradient-to-b from-white to-grey-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-24">
        <div class="mb-7">
          <h2 class="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.8px] text-grey-10 mb-7">
            Contrate os melhores músicos, selecionados pela equipe do EasyMusic.
          </h2>
        </div>

        <!-- Tabs -->
        <div class="border-b border-grey-91 mb-8">
          <div class="flex gap-8 overflow-x-auto">
            <button class="text-grey-10 text-sm pb-4 border-b-2 border-grey-10 whitespace-nowrap">Tudo</button>
            <button class="text-grey-44 text-sm pb-4 border-b-2 border-transparent hover:text-grey-10 whitespace-nowrap">Designers de logotipo</button>
            <button class="text-grey-44 text-sm pb-4 border-b-2 border-transparent hover:text-grey-10 whitespace-nowrap">Designers de embalagem</button>
            <button class="text-grey-44 text-sm pb-4 border-b-2 border-transparent hover:text-grey-10 whitespace-nowrap">Ilustradores</button>
            <button class="text-grey-44 text-sm pb-4 border-b-2 border-transparent hover:text-grey-10 whitespace-nowrap">Designers de UI/UX</button>
          </div>
        </div>

        <!-- Musicians Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
          @for (musician of musicians; track musician.name) {
            <div class="border border-grey-88 bg-white rounded-md p-1.5 hover:shadow-card transition-shadow">
              <!-- Works Preview -->
              <div class="flex gap-0.5 mb-8 rounded-sm overflow-hidden h-[84px]">
                @for (work of musician.works; track work) {
                  <img [src]="work" [alt]="musician.name" class="flex-1 object-cover">
                }
              </div>

              <!-- Profile Info -->
              <div class="px-3 pb-5">
                <!-- Avatar -->
                <div class="flex justify-center -mt-8 mb-2.5">
                  <div class="relative">
                    <img 
                      [src]="musician.avatar" 
                      [alt]="musician.name"
                      class="w-[60px] h-[60px] rounded-full border-2 border-white shadow-card"
                    />
                    @if (musician.pro) {
                      <div class="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#0088FD] via-primary-dark to-primary-darker text-white text-[9px] uppercase px-2 py-0.5 rounded">
                        Pro
                      </div>
                    }
                  </div>
                </div>

                <!-- Name & Location -->
                <div class="text-center mb-2.5">
                  <h3 class="text-grey-10 text-lg leading-[23.39px] mb-0.5">{{ musician.name }}</h3>
                  <div class="flex items-center justify-center gap-1 text-grey-44 text-sm">
                    <svg class="w-2 h-3" viewBox="0 0 9 12" fill="#959595">
                      <path d="M4.28004 0.00683598C3.14491 0.00683598 2.05633 0.45756 1.25367 1.26022C0.451017 2.06287 0 3.15146 0 4.28658C0 7.71034 4.28004 11.9906 4.28004 11.9906C4.28004 11.9906 8.56008 7.71034 8.56008 4.28658C8.56016 3.7245 8.44951 3.16866 8.23445 2.64935C8.01939 2.13004 7.70415 1.65767 7.3067 1.26022C6.90925 0.862765 6.43717 0.547239 5.91786 0.332176C5.39855 0.117114 4.84212 0.00675727 4.28004 0.00683598Z"/>
                    </svg>
                    <span>{{ musician.location }}</span>
                    @if (musician.responsive) {
                      <span class="mx-1">•</span>
                      <span class="text-green-27">Responde rapidamente</span>
                    }
                  </div>
                </div>

                <!-- Hire Button -->
                <button class="w-full border border-grey-91 bg-white text-grey-10 text-sm rounded-full py-2 mb-2.5 hover:border-grey-10 transition-colors">
                  Contratar {{ musician.name.split(' ')[0] }}
                </button>

                <!-- Projects Badge -->
                <div class="flex justify-center gap-2">
                  @if (musician.featured) {
                    <span class="bg-primary/5 border border-primary/10 text-primary text-xs px-2.5 py-2 rounded-lg">
                      Em destaque
                    </span>
                  }
                  <span class="bg-white border border-primary/10 text-primary text-xs px-2.5 py-2 rounded-lg">
                    {{ musician.projects }} projetos concluídos
                  </span>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button class="bg-primary text-white rounded-full px-8 py-3 text-base hover:bg-primary-dark transition-colors">
            Começar
          </button>
          <button class="border border-grey-91 bg-white text-grey-10 rounded-full px-7 py-3 text-base hover:border-grey-10 transition-colors">
            Procurar freelancers
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="bg-gradient-to-b from-grey-2 via-white to-grey-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-24 border-b border-grey-88">
        <div class="text-center mb-16">
          <p class="text-primary text-xl tracking-[-0.4px] leading-[15px] mb-4">Como funciona</p>
          <h2 class="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.8px] text-grey-10">
            Contratar no EasyMúsic<br>é fácil e seguro.
          </h2>
        </div>

        <!-- Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          @for (step of steps; track step.number) {
            <div 
              class="rounded-xl border bg-white p-7 h-[197px] flex flex-col"
              [class.border-primary]="step.number === 1"
              [class.shadow-primary]="step.number === 1"
              [class.border-grey-88]="step.number !== 1"
              [class.shadow-primary-sm]="step.number !== 1"
            >
              <!-- Icon -->
              <div class="flex justify-center mb-5">
                @if (step.number === 1) {
                  <svg class="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.575 4.91146C17.575 2.47508 19.5501 0.5 21.9865 0.5C24.4229 0.5 26.3979 2.47508 26.3979 4.91146C26.3979 7.34784 24.4229 9.32292 21.9865 9.32292C19.5501 9.32292 17.575 7.34784 17.575 4.91146Z" fill="#0057FF"/>
                  </svg>
                } @else if (step.number === 2) {
                  <svg class="w-7 h-7" viewBox="0 0 28 27" fill="none">
                    <path d="M10.6795 25.75C10.3369 24.7786 9.70135 23.9375 8.86054 23.3425C8.01974 22.7475 7.01506 22.4279 5.98503 22.4279C4.95499 22.4279 3.95032 22.7475 3.10951 23.3425C2.2687 23.9375 1.63317 24.7786 1.29053 25.75M26.2905 11.583C25.9479 10.6116 25.3124 9.77046 24.4715 9.17546C23.6307 8.58047 22.6261 8.26094 21.596 8.26094C20.566 8.26094 19.5613 8.58047 18.7205 9.17546C17.8797 9.77046 17.2442 10.6116 16.9015 11.583Z" stroke="#0057FF" stroke-width="1.5"/>
                  </svg>
                } @else {
                  <svg class="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path d="M23.6001 9.63645V2.65463C23.6001 2.19171 23.4162 1.74775 23.0889 1.42041C22.7615 1.09308 22.3176 0.90918 21.8546 0.90918H2.65463C2.19171 0.90918 1.74775 1.09308 1.42041 1.42041C1.09308 1.74775 0.90918 2.19171 0.90918 2.65463V16.6183C0.90918 17.0812 1.09308 17.5252 1.42041 17.8525C1.74775 18.1798 2.19171 18.3637 2.65463 18.3637H13.1274" stroke="#0057FF" stroke-width="1.45"/>
                  </svg>
                }
              </div>

              <!-- Content -->
              <h3 class="text-[15px] font-normal leading-[15px] tracking-[-0.3px] mb-3"
                  [class.text-primary]="step.number === 1"
                  [class.text-grey-10]="step.number !== 1">
                {{ step.number }}. {{ step.title }}
              </h3>
              <p class="text-[15px] font-normal leading-[21px] tracking-[-0.3px] flex-1"
                 [class.text-grey-10]="step.number === 1"
                 [class.text-grey-44]="step.number !== 1">
                {{ step.description }}
              </p>
            </div>
          }
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button class="bg-primary text-white rounded-full px-8 py-3 text-base hover:bg-primary-dark transition-colors">
            Começar
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-gradient-to-b from-grey-2 via-white to-grey-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-24">
        <div class="mb-16">
          <p class="text-primary text-xl tracking-[-0.4px] leading-[15px] mb-4">Histórias de sucesso</p>
          <h2 class="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.8px] text-grey-10 mb-5">
            Veja o que os clientes estão<br>dizendo.
          </h2>
          <p class="text-lg text-grey-10 tracking-[-0.54px] leading-6">
            Descubra por que 98% dos usuários recomendam músicos contratados pelo EasyMusic.
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-7">
          @for (testimonial of testimonials; track testimonial.author) {
            <div class="border border-grey-88 bg-white rounded-2xl p-10">
              <p class="text-grey-10 text-lg leading-[25.99px] mb-5">
                {{ testimonial.text }}
              </p>
              <div class="flex items-center gap-3">
                <img 
                  [src]="testimonial.avatar" 
                  [alt]="testimonial.author"
                  class="w-10 h-10 rounded-full"
                />
                <span class="text-grey-10 text-lg leading-[25.99px]">{{ testimonial.author }}</span>
              </div>
            </div>
          }
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button class="bg-primary text-white rounded-full px-8 py-3 text-base hover:bg-primary-dark transition-colors">
            Começar
          </button>
          <button class="border border-grey-91 bg-white text-grey-10 rounded-full px-7 py-3 text-base hover:border-grey-10 transition-colors">
            Procurar músico
          </button>
        </div>
      </div>
    </section>

    <!-- Enterprise CTA Section -->
    <section class="bg-gradient-to-b from-grey-2 to-white px-4 sm:px-6 lg:px-8 pt-24 pb-14">
      <div class="max-w-7xl mx-auto">
        <div class="border border-grey-88 bg-white rounded-2xl p-8 lg:p-20 text-center">
          <h2 class="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.8px] text-grey-10 mb-7 max-w-[535px] mx-auto">
            Deseja contratar em nome da sua empresa?
          </h2>
          <p class="text-lg text-grey-10 tracking-[-0.54px] leading-6 mb-12 max-w-[660px] mx-auto">
            Nossa equipe ajuda você a encontrar os músicos ideais para eventos corporativos, produções especiais ou parcerias exclusivas.
          </p>
          <button class="bg-primary text-white text-lg rounded-full px-6 py-3 hover:bg-primary-dark transition-colors">
            Fale conosco
          </button>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  `,
})
export class HireFreelancersComponent {
  categories = [
    { title: 'Cantores / Bandas', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'DJs e Produtores', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Instrumentistas', image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Compositores e Letristas', image: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Professores de música', image: 'https://images.pexels.com/photos/6670732/pexels-photo-6670732.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Técnicos de som e estúdio', image: 'https://images.pexels.com/photos/744318/pexels-photo-744318.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Trilhas sonoras e jingles', image: 'https://images.pexels.com/photos/3856050/pexels-photo-3856050.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { title: 'Arranjadores e maestros', image: 'https://images.pexels.com/photos/7520392/pexels-photo-7520392.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  benefits = [
    {
      icon: 'sparkles',
      title: 'Acesso aos melhores músicos da cidade',
      description: 'Destaque-se em um grupo de mais de 2 milhões de freelancers qualificados',
    },
    {
      icon: 'tools',
      title: 'Todas as ferramentas certas em um só lugar',
      description: 'Inicie conversas, compartilhe arquivos e participe de videochamadas com candidatos',
    },
    {
      icon: 'payment',
      title: 'Pagamentos seguros',
      description: 'Pague com segurança e simplicidade usando um cartão de débito ou crédito no EasyMusic',
    },
    {
      icon: 'verified',
      title: 'Perfis verificados',
      description: 'Contrate com tranquilidade: músicos verificados garantem mais segurança e profissionalismo',
      badge: 'Pro',
    },
  ];

  steps = [
    {
      number: 1,
      title: 'Leia as recomendações',
      description: 'Receba sugestões de músicos ideais com base no estilo, localização e tipo de evento. Analise portfólios e avaliações reais.',
    },
    {
      number: 2,
      title: 'Contrate e colabore',
      description: 'Converse com o artista, alinhe detalhes, envie materiais de referência e combine tudo de forma prática e centralizada.',
    },
    {
      number: 3,
      title: 'Pague com segurança na plataforma',
      description: 'Finalize a contratação com métodos de pagamento protegidos — sua reserva e a do músico ficam seguras até a entrega.',
    },
  ];

  musicians = [
    {
      name: 'Opedia Studio',
      location: 'Bangladesh',
      projects: 275,
      responsive: true,
      pro: true,
      avatar: 'https://i.pravatar.cc/150?img=1',
      works: [
        'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=200',
      ],
    },
    {
      name: 'Numan Qadir',
      location: 'United Kingdom',
      projects: 105,
      responsive: true,
      pro: true,
      avatar: 'https://i.pravatar.cc/150?img=2',
      works: [
        'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200',
      ],
    },
    {
      name: 'Studio Moara',
      location: 'Indonesia',
      projects: 101,
      responsive: true,
      pro: true,
      avatar: 'https://i.pravatar.cc/150?img=3',
      works: [
        'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/2291010/pexels-photo-2291010.jpeg?auto=compress&cs=tinysrgb&w=200',
      ],
    },
    {
      name: 'Laurentiu Gabriel Dumitru',
      location: 'Romania',
      projects: 30,
      responsive: true,
      pro: true,
      featured: true,
      avatar: 'https://i.pravatar.cc/150?img=4',
      works: [
        'https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/3782234/pexels-photo-3782234.jpeg?auto=compress&cs=tinysrgb&w=200',
        'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=200',
      ],
    },
  ];

  testimonials = [
    {
      text: 'A banda foi incrível! Comunicação rápida e performance impecável. Todos os convidados amaram.',
      author: 'Camila Andrade',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      text: '"Encontrei um violinista perfeito em poucos minutos. A plataforma facilitou todo o processo."',
      author: 'Ulysses Design Co',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    {
      text: '"A contratação foi super segura, e o DJ deixou a festa inesquecível. Recomendo demais!"',
      author: 'Kira Koroknai',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
  ];

  searchQuery = '';

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }
}