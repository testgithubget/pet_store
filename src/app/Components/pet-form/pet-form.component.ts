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
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css',
})
export class PetFormComponent implements OnInit {
  petForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private petService: PetService) {}
  ngOnInit(): void {
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
  }

  get tags(): FormArray {
    return this.petForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(
      this.fb.group({
        id: [0], // ✅ Default to 0
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
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit ID
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const pet: Pet = {
        // id: 0, 
        id: this.generateRandomId(), 
        name: this.petForm.value.name,
        category: {
          id: this.petForm.value.category.id || 0, 
          name: this.petForm.value.category.name,
        },
        photoUrls: this.petForm.value.photoUrls.length
          ? this.petForm.value.photoUrls
          : [], 
        tags: this.petForm.value.tags.map((tag: { id: any; name: any; }) => ({
          id: tag.id || 0, 
          name: tag.name,
        })),
        status: this.petForm.value.status,
      };

      console.log('Submitting Pet Data:', JSON.stringify(pet, null, 2));

      this.petService.createPet(pet).subscribe({
        next: (newPet) => {
          console.log('Pet created successfully:', newPet);
          this.petForm.reset();
          this.imagePreview = null; 
        },
        error: (err) => {
          console.error('Error creating pet:', err);
        },
      });
    }
  }
}
