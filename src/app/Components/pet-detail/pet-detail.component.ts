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
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PetService } from '../../Service/pet.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Pet } from '../../Model/pet.model';
import { ConfirmationComponent } from '../notification/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

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
    
  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css',
})
export class PetDetailComponent implements OnInit {
  pet!: Pet;
  imagePreview: string | null = null;
  id!: number;
  petForm!: FormGroup;
  petId: number | undefined;


  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.petForm = this.fb.group({
      name: [''],
      category: this.fb.group({
        id: [0], 
        name: [''],
      }),
      status: ['available'], 
      photoUrls: this.fb.array([]), 
      tags: this.fb.array([]), 
    });
  }

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
    // this.router.navigate(['/']);
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

  onDelete(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.petService.deletePet(id).subscribe({
          next: () => {
            console.log(`Pet with ID ${id} deleted successfully.`);
            this.router.navigate(['list']);
          },
          error: (error) => {
            console.error(`Error deleting pet with ID ${id}:`, error);
          },
        });
      }
    });
  }

  
  onEdit(pet: Pet): void {
    this.router.navigate(['/edit', pet.id]);
  }
  
  
  get tags() {
    return this.petForm.get('tags') as FormArray;
  }

  
  
}
