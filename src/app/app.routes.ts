import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FindJobsComponent } from './components/find-jobs.component';
import { HireFreelancersComponent } from './components/hire-freelancers.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'find-jobs', component: FindJobsComponent },
    { path: 'hire-freelancers', component: HireFreelancersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
