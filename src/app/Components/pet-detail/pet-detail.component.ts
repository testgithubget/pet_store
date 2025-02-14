import {
  Component,
  EventEmitter,
  Input,
  numberAttribute,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../Service/pet.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Pet } from '../../Model/pet.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css',
})
export class PetDetailComponent implements OnInit {
  pet!: Pet;
  imagePreview: string | null = null;
  id!: number;


  constructor(private petService: PetService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const petId = Number(params.get('id'));
      // console.log('Pet ID from Params:', petId);

      if (!petId || petId <= 0) {
        console.warn('Invalid Pet ID:', petId);
        return;
      }

      this.loadDetails(petId);
    });
  }

  refreshList() {
    // this.petService.getPetByStatus(status).subscribe({
    //   next: (pets) => {
    //     this.pets = pets; 
    //     console.log('Pet list refreshed:', this.pets);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching pet list:', error);
    //   }
    // });
  }

  loadDetails(id: number): void {
    console.log('Testing with hardcoded Pet ID:', id);

    this.petService.getPet(id).subscribe(
      (data) => {
        console.log('Pet data received:', data);
        this.pet = data;
        this.imagePreview = data.photoUrls?.[0] || null;
      },
      (error) => {
        console.error('Error fetching pet:', error);
      }
    );
  }

  onDelete(id: number | undefined) {
    if (id === undefined) {
      console.error('Pet ID is undefined. Cannot delete.');
      return; 
    }
  
    this.petService.deletePet(id).subscribe({
      next: (response) => {
        console.log(`Pet with ID ${id} deleted successfully.`);
        this.refreshList(); 
      },
      error: (error) => {
        console.error(`Error deleting pet with ID ${id}:`, error);
      }
    });
  }
  

  onEdit() {}

}
