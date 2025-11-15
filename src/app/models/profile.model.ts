export interface Profile {
  _id?: string;
  userId: string;
  bio?: string;
  musicalGenres?: string[];
  instruments?: string[];
  skills?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  hourlyRate?: number;
  availability?: 'Disponível' | 'Parcialmente disponível' | 'Indisponível';
  portfolioLinks?: PortfolioLink[];
  yearsOfExperience?: number;
  socialMedia?: SocialMedia;
  rating?: number;
  completedProjects?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PortfolioLink {
  title: string;
  url: string;
  type: 'youtube' | 'spotify' | 'soundcloud' | 'instagram' | 'other';
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  spotify?: string;
  soundcloud?: string;
}

export interface ProfileUpdateRequest {
  bio?: string;
  musicalGenres?: string[];
  instruments?: string[];
  skills?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  hourlyRate?: number;
  availability?: string;
  portfolioLinks?: PortfolioLink[];
  yearsOfExperience?: number;
  socialMedia?: SocialMedia;
}
