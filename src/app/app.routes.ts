import { Routes } from '@angular/router';
import { PetFormComponent } from './Components/pet-form/pet-form.component';
import { PetListComponent } from './Components/pet-list/pet-list.component';
import { PetDetailComponent } from './Components/pet-detail/pet-detail.component';
import { SplashComponent } from './Components/Splash/splash.component';

export const routes: Routes = [
    
    {path: '', component : SplashComponent},
    {path: 'edit/:id', component: PetFormComponent },  
    {path: 'list' , component: PetListComponent},
    {path: 'detail/:id' , component: PetDetailComponent},
    {path: 'add' , component: PetFormComponent},
    {path: 'splash', component : SplashComponent},
    
];
