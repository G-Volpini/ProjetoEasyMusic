export interface Project {
  _id: string;
  title: string;
  description: string;
  author: {
    userId: string;
    name: string;
  };
  imageUrl: string;
  musicalGenre: string;
  tags?: string[];
  projectType?: 'show' | 'gravacao' | 'aula' | 'producao' | 'outro';
  budget?: {
    min?: number;
    max?: number;
  };
  duration?: string;
  location?: {
    city?: string;
    state?: string;
    isRemote?: boolean;
  };
  likes: number;
  views: number;
  saves: number;
  status?: 'active' | 'completed' | 'cancelled' | 'draft';
  requirements?: string;
  deadline?: Date;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProjectFilters {
  search?: string;
  musicalGenre?: string;
  city?: string;
  projectType?: string;
  minBudget?: number;
  maxBudget?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  imageUrl: string;
  musicalGenre: string;
  tags?: string[];
  projectType?: string;
  budget?: {
    min?: number;
    max?: number;
  };
  duration?: string;
  location?: {
    city?: string;
    state?: string;
    isRemote?: boolean;
  };
  requirements?: string;
  deadline?: Date;
  contactPhone?: string;
}
