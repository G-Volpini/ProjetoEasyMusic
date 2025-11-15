import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { HeroComponent } from './hero.component';
import { ProjectCardComponent } from './project-card.component';
import { LoginSectionComponent } from './login-section.component';
import { FooterComponent } from './footer.component';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project, ProjectFilters } from '../models/project.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        HeroComponent,
        ProjectCardComponent,
        LoginSectionComponent,
        FooterComponent
    ],
    templateUrl: '../app.html',
    styleUrls: ['../app.css']
})
export class HomeComponent implements OnInit {
    projects: Project[] = [];
    isLoading = true;
    searchTerm = '';
    selectedGenre = '';
    filters: ProjectFilters = {};
    isAuthenticated = false;

    musicalGenres = [
        'Todos',
        'Pop',
        'Rock',
        'Jazz',
        'Clássico',
        'Sertanejo',
        'MPB',
        'Eletrônica',
        'Hip Hop',
        'Samba'
    ];

    constructor(
        private projectService: ProjectService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isLoggedIn();
        this.loadProjects();
    }

    loadProjects(): void {
        this.isLoading = true;
        
        this.projectService.getProjects(this.filters).subscribe({
            next: (response) => {
                this.projects = response.projects;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar projetos:', error);
                this.isLoading = false;
            }
        });
    }

    onSearch(): void {
        this.filters.search = this.searchTerm;
        this.loadProjects();
    }

    onFilterByGenre(genre: string): void {
        this.selectedGenre = genre;
        if (genre === 'Todos') {
            delete this.filters.musicalGenre;
        } else {
            this.filters.musicalGenre = genre;
        }
        this.loadProjects();
    }

    onSortChange(sortType: string): void {
        this.filters.sort = sortType;
        this.loadProjects();
    }
}