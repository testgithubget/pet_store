import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [ReactiveFormsModule , MatInputModule , MatButtonModule , MatSelectModule , MatCheckboxModule , MatFormFieldModule, MatIconModule , MatCardModule ,CommonModule , MatOptionModule ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  petForm: FormGroup;
  tags = [
    { id: 1, name: 'Small' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Large' }
  ];

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      photoUrls: [null, Validators.required],
      tags: this.fb.group({
        '1': [false],
        '2': [false],
        '3': [false],
      }),
      status: ['available', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.petForm.patchValue({ photoUrls: file });
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      console.log(this.petForm.value);
    }
  }
}
