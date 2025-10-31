import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-white py-12">
      <div class="max-w-[348px] mx-auto px-4">
        <h2 class="text-center text-[21px] font-bold font-source-sans leading-7 text-black mb-6">
          Faça logon para trabalhar na maior plataforma Musical do mercado!
        </h2>

        <div class="space-y-4 mb-6">
          <!-- Google -->
          <button class="w-full h-12 px-4 flex items-center justify-center gap-2 rounded-full border-2 border-gray-lightest bg-white hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6802 8.18263C15.6803 7.63401 15.6312 7.08649 15.5336 6.54663H8.00024V9.6413H12.3056C12.2165 10.1308 12.0291 10.5972 11.7546 11.0122C11.4802 11.4273 11.1245 11.7823 10.7089 12.056V14.0633H13.2942C14.0817 13.3051 14.7009 12.3898 15.1119 11.3768C15.5228 10.3639 15.7162 9.27583 15.6796 8.1833L15.6802 8.18263Z" fill="#4285F4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00022 16.0006C9.9477 16.0536 11.8418 15.3603 13.2949 14.0626L10.7096 12.0553C10.0911 12.4522 9.39019 12.7027 8.66024 12.7877C7.93029 12.8726 7.19058 12.7897 6.49752 12.5454C5.80446 12.301 5.17635 11.9016 4.66107 11.3777C4.1458 10.8537 3.75696 10.219 3.52422 9.52197H0.850891V11.5946C1.51711 12.9195 2.53847 14.0331 3.80093 14.8112C5.0634 15.5892 6.51727 16.001 8.00022 16.0006Z" fill="#34A853"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52356 9.52063C3.189 8.53491 3.189 7.46635 3.52356 6.48063V4.40796H0.850891C0.29137 5.52292 0 6.75315 0 8.00063C0 9.2481 0.29137 10.4783 0.850891 11.5933L3.52356 9.52063Z" fill="#FBBC05"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00022 3.18252C9.1373 3.16356 10.236 3.59351 11.0582 4.37919L13.3529 2.08385C11.9048 0.72401 9.98658 -0.0225849 8.00022 0.000520735C6.51713 0.000258551 5.06316 0.412272 3.80068 1.19055C2.5382 1.96883 1.51692 3.08273 0.850891 4.40785L3.52356 6.48052C3.83101 5.53162 4.42831 4.70303 5.23137 4.1114C6.03444 3.51978 7.00283 3.1949 8.00022 3.18252Z" fill="#EA4335"/>
            </svg>
            <span class="text-[#464646] font-source-sans font-bold text-sm">Continuar com Google</span>
          </button>

          <!-- Facebook -->
          <button class="w-full h-12 px-4 flex items-center justify-center gap-2 rounded-full border-2 border-gray-lightest bg-white hover:bg-gray-50 transition-colors">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <path d="M10.6667 15.9111C6.88889 15.2444 4 11.9556 4 8C4 3.6 7.6 0 12 0C16.4 0 20 3.6 20 8C20 11.9556 17.1111 15.2444 13.3333 15.9111L12.8889 15.5556H11.1111L10.6667 15.9111Z" fill="url(#paint0_linear_1_2519)"/>
              <path d="M15.1111 10.2222L15.4667 7.99997H13.3334V6.44442C13.3334 5.8222 13.5556 5.33331 14.5334 5.33331H15.5556V3.28886C14.9778 3.19997 14.3556 3.11108 13.7778 3.11108C11.9556 3.11108 10.6667 4.2222 10.6667 6.2222V7.99997H8.66669V10.2222H10.6667V15.8666C11.1111 15.9555 11.5556 16 12 16C12.4445 16 12.8889 15.9555 13.3334 15.8666V10.2222H15.1111Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_1_2519" x1="804" y1="1544.62" x2="804" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0062E0"/>
                  <stop offset="1" stop-color="#19AFFF"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="text-[#464646] font-source-sans font-bold text-[13px]">Continuar com Facebook</span>
          </button>

          <!-- Apple -->
          <button class="w-full h-12 px-4 flex items-center justify-center gap-2 rounded-full border-2 border-gray-lightest bg-white hover:bg-gray-50 transition-colors">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M14.8598 6.1362C14.7554 6.2172 12.9122 7.2558 12.9122 9.5652C12.9122 12.2364 15.2576 13.1814 15.3278 13.2048C15.317 13.2624 14.9552 14.499 14.0912 15.759C13.3208 16.8678 12.5162 17.9748 11.2922 17.9748C10.0682 17.9748 9.75321 17.2638 8.34021 17.2638C6.96321 17.2638 6.47361 17.9982 5.35401 17.9982C4.23441 17.9982 3.45321 16.9722 2.55501 15.7122C1.51461 14.2326 0.674011 11.934 0.674011 9.7524C0.674011 6.2532 2.94921 4.3974 5.18841 4.3974C6.37821 4.3974 7.37001 5.1786 8.11701 5.1786C8.82801 5.1786 9.93681 4.3506 11.2904 4.3506C11.8034 4.3506 13.6466 4.3974 14.8598 6.1362ZM10.6478 2.8692C11.2076 2.205 11.6036 1.2834 11.6036 0.3618C11.6036 0.234 11.5928 0.1044 11.5694 0C10.6586 0.0342 9.57501 0.6066 8.92161 1.3644C8.40861 1.9476 7.92981 2.8692 7.92981 3.8034C7.92981 3.9438 7.95321 4.0842 7.96401 4.1292C8.02161 4.14 8.11521 4.1526 8.20881 4.1526C9.02601 4.1526 10.0538 3.6054 10.6478 2.8692Z" fill="black"/>
            </svg>
            <span class="text-[#464646] font-source-sans font-bold text-sm">Continuar com Apple</span>
          </button>
        </div>

        <div class="flex items-center gap-2 mb-6">
          <div class="flex-1 h-px bg-gray-lightest"></div>
          <span class="text-black font-source-sans text-sm">Ou</span>
          <div class="flex-1 h-px bg-gray-lightest"></div>
        </div>

        <div class="space-y-2">
          <h3 class="text-black font-source-sans font-bold text-[18px] leading-7">
            Continuar com email
          </h3>
          <div class="space-y-2">
            <label class="block text-[#464646] font-source-sans text-sm">
              Endereço de email
            </label>
            <input type="email" 
                   class="w-full h-10 px-3 rounded border-2 border-dark-light focus:outline-none focus:border-secondary transition-colors" />
          </div>
          <div class="flex justify-end pt-4">
            <button class="px-4 py-1.5 bg-dark text-white font-source-sans font-bold text-[13px] rounded-2xl hover:bg-dark-light transition-colors">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LoginSectionComponent {}
