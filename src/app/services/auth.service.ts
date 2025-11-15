import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'easymusic_token';
  
  // Usando signals para estado reativo
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  isAuthenticated = computed(() => this.currentUserSubject.value !== null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar se há token ao iniciar
    this.checkAuthStatus();
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('easymusic_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      // Validar token com o backend
      this.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUserSubject.next(user);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('easymusic_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUserType(): 'freelancer' | 'employer' | null {
    const user = this.currentUserSubject.value;
    return user ? user.userType : null;
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('easymusic_user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }
}
