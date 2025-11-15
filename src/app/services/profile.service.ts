import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, ProfileUpdateRequest } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profiles';

  constructor(private http: HttpClient) {}

  // Obter perfil do usuário logado
  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/me`);
  }

  // Atualizar perfil do usuário logado
  updateMyProfile(data: ProfileUpdateRequest): Observable<{ message: string; profile: Profile }> {
    return this.http.put<{ message: string; profile: Profile }>(`${this.apiUrl}/me`, data);
  }

  // Obter perfil público de um usuário
  getProfileById(userId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${userId}`);
  }

  // Buscar perfis com filtros
  searchProfiles(filters: {
    musicalGenre?: string;
    city?: string;
    minRate?: number;
    maxRate?: number;
    availability?: string;
  }): Observable<Profile[]> {
    const params: any = {};
    
    if (filters.musicalGenre) params.musicalGenre = filters.musicalGenre;
    if (filters.city) params.city = filters.city;
    if (filters.minRate) params.minRate = filters.minRate.toString();
    if (filters.maxRate) params.maxRate = filters.maxRate.toString();
    if (filters.availability) params.availability = filters.availability;

    return this.http.get<Profile[]>(this.apiUrl, { params });
  }
}
