import { Routes } from '@angular/router';
import { PetFormComponent } from './Components/pet-form/pet-form.component';
import { PetListComponent } from './Components/pet-list/pet-list.component';
import { PetDetailComponent } from './Components/pet-detail/pet-detail.component';

export const routes: Routes = [
    {path: '', component : PetFormComponent},
    { path: 'edit/:id', component: PetFormComponent },  
    {path: 'list' , component: PetListComponent},
    {path: 'detail/:id' , component: PetDetailComponent}
];
