import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeroComponent } from './hero.component';
import { ProjectCardComponent } from './project-card.component';
import { LoginSectionComponent } from './login-section.component';
import { FooterComponent } from './footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeaderComponent,
        HeroComponent,
        ProjectCardComponent,
        LoginSectionComponent,
        FooterComponent
    ],
    templateUrl: '../app.html',
    styleUrls: ['../app.css']
})
export class HomeComponent {
    // Your existing logic here
}