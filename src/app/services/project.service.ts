import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  Project, 
  ProjectsResponse, 
  ProjectFilters, 
  CreateProjectRequest 
} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  // Listar projetos com filtros
  getProjects(filters?: ProjectFilters): Observable<ProjectsResponse> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.musicalGenre) params = params.set('musicalGenre', filters.musicalGenre);
      if (filters.city) params = params.set('city', filters.city);
      if (filters.projectType) params = params.set('projectType', filters.projectType);
      if (filters.minBudget) params = params.set('minBudget', filters.minBudget.toString());
      if (filters.maxBudget) params = params.set('maxBudget', filters.maxBudget.toString());
      if (filters.sort) params = params.set('sort', filters.sort);
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<ProjectsResponse>(this.apiUrl, { params });
  }

  // Obter detalhes de um projeto
  getProjectById(id: string): Observable<Project> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => response.project)
    );
  }

  // Criar novo projeto
  createProject(data: CreateProjectRequest): Observable<{ message: string; project: Project }> {
    return this.http.post<{ message: string; project: Project }>(this.apiUrl, data);
  }

  // Atualizar projeto
  updateProject(id: string, data: Partial<CreateProjectRequest>): Observable<{ message: string; project: Project }> {
    return this.http.put<{ message: string; project: Project }>(`${this.apiUrl}/${id}`, data);
  }

  // Deletar projeto
  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Curtir projeto
  likeProject(id: string): Observable<{ likes: number }> {
    return this.http.post<{ likes: number }>(`${this.apiUrl}/${id}/like`, {});
  }

  // Salvar projeto
  saveProject(id: string): Observable<{ saves: number }> {
    return this.http.post<{ saves: number }>(`${this.apiUrl}/${id}/save`, {});
  }
}
