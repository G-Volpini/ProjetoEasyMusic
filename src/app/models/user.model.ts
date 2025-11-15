export interface User {
  id: string;
  email: string;
  userType: 'freelancer' | 'employer';
  name?: string;
  companyName?: string;
  phone?: string;
  document?: string;
  profileImage?: string;
  createdAt?: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm?: string;
  userType: 'freelancer' | 'employer';
  name?: string;
  companyName?: string;
  phone?: string;
  document?: string;
}
