import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2">
      <!-- Image -->
      <div class="relative bg-gray-bg rounded overflow-hidden aspect-[343/268] group cursor-pointer">
        <img [src]="imageUrl" 
             [alt]="title" 
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <button class="absolute top-3 right-3 px-4 py-1 bg-black/65 backdrop-blur-sm text-white text-xs rounded-full hover:bg-black/80 transition-colors">
          Salvar
        </button>
      </div>

      <!-- Info -->
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h3 class="text-dark text-[15px] leading-[18px] mb-1 hover:text-secondary cursor-pointer transition-colors">
            {{ title }}
          </h3>
          <div class="flex items-center gap-1.5">
            <span class="text-dark text-xs">{{ author }}</span>
            <span class="px-2 py-0.5 bg-purple-pro text-white text-[9px] uppercase rounded">Pro</span>
          </div>
        </div>

        <div class="flex flex-col items-end gap-0.5">
          <div class="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M0 7H3V15H0V7ZM6.707 14.707C6.9 14.897 7.132 14.997 7.384 15H11.5C11.756 15 12.012 14.902 12.207 14.707L14.707 12.207C14.897 12.017 14.995 11.75 15 11.5V8C15 7.447 14.555 7 14 7H9L10.5 4.5C10.5 4.5 11 3.708 11 3V2C11 1.447 10.553 1 10 1L9 3L5 7V13L6.707 14.707Z" fill="#959595"/>
            </svg>
            <span class="text-dark text-xs">{{ likes }}</span>
          </div>
          <div class="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.5 3.5C3.5 3.5 0.5 8.5 0.5 8.5C0.5 8.5 3.5 13.5 8.5 13.5C13.5 13.5 16.5 8.5 16.5 8.5C16.5 8.5 13.5 3.5 8.5 3.5ZM8.5 10.5C7.395 10.5 6.5 9.604 6.5 8.5C6.5 7.394 7.395 6.5 8.5 6.5C9.604 6.5 10.5 7.394 10.5 8.5C10.5 9.604 9.604 10.5 8.5 10.5Z" fill="#959595"/>
            </svg>
            <span class="text-dark text-[11px]">{{ views }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() imageUrl = 'https://api.builder.io/api/v1/image/assets/TEMP/e9251f689e1bfc4509cf5d0df9bd1418490bc342?width=686';
  @Input() title = 'Template de Cantor Freelancer';
  @Input() author = 'ProductorEasyMusic';
  @Input() likes = '204';
  @Input() views = '12,1 mil';
}
