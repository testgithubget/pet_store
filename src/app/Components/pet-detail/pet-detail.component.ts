import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PetService } from '../../Service/pet.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule , CommonModule],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css'
})
export class PetDetailComponent {
pet: any;

  
  constructor( private http : HttpClient , 
               private petService : PetService
  ) { }


}
