import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { PetService } from '../../Service/pet.service';
import { Pet } from '../../Model/pet.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatOptionModule,
    RouterLink,
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css',
})
export class PetFormComponent implements OnInit {
  petForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode: boolean = false;
  petId!: number;
  submitting = false;


  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.petId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = this.petId ? true : false;

    this.petForm = this.fb.group({
      name: ['', Validators.required],
      category: this.fb.group({
        id: [null],
        name: ['', Validators.required],
      }),
      photoUrls: [[], Validators.required],
      tags: this.fb.array([]),
      status: ['available', Validators.required],
    });

    if (this.isEditMode === false) {
    } else {
      this.loadPetData(); 
    }
  }

  loadPetData(): void {
    this.petService.getPet(this.petId).subscribe((pet: Pet) => {
      this.petForm.patchValue({
        name: pet.name,
        category: {
          id: pet.category?.id || 0,
          name: pet.category?.name || '',
        },
        status: pet.status || 'available',
        photoUrls: pet.photoUrls || [],
      });

       // If there's at least one image, display it
    if (pet.photoUrls && pet.photoUrls.length > 0) {
      this.imagePreview = pet.photoUrls[0]; // Assuming single image display
    }
    

      const tagsArray = this.petForm.get('tags') as FormArray;
      tagsArray.clear();
      pet.tags?.forEach((tag) => {
        tagsArray.push(
          this.fb.group({
            id: [tag.id],
            name: [tag.name],
          })
        );
      });
    });
  }

  get tags(): FormArray {
    return this.petForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(
      this.fb.group({
        id: [0],
        name: ['', Validators.required],
      })
    );
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.petForm.patchValue({ photoUrls: [reader.result as string] });
      };
      reader.readAsDataURL(file);
    }
  }

  generateRandomId(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }


  onSubmit(): void {
    if (this.petForm.valid && !this.submitting) {
      this.submitting = true; 
      const pet: Pet = {
        id: this.isEditMode ? this.petId : this.generateRandomId(),
        name: this.petForm.value.name,
        category: {
          id: this.petForm.value.category.id || 0,
          name: this.petForm.value.category.name,
        },
        photoUrls: this.petForm.value.photoUrls.length
          ? this.petForm.value.photoUrls
          : [],
        tags: this.petForm.value.tags.map((tag: { id: any; name: any }) => ({
          id: tag.id || 0,
          name: tag.name,
        })),
        status: this.petForm.value.status,
      };
  
      if (this.isEditMode) {
        this.petService.updatePet(pet).subscribe({
          next: (updatedPet) => {
            console.log('Pet updated successfully:', updatedPet);
            this.router.navigate(['/detail', updatedPet.id]);
          },
          error: (err) => {
            console.error('Error updating pet:', err);
          },
          complete: () => {
            this.submitting = false; 
          },
        });
      } else {
        this.petService.createPet(pet).subscribe({
          next: (newPet) => {
            console.log('Pet created successfully:', newPet);
            this.router.navigate(['/detail', newPet.id]);
          },
          error: (err) => {
            console.error('Error creating pet:', err);
          },
          complete: () => {
            this.submitting = true; 
          },
        });
      }
    }
  }
  
}
