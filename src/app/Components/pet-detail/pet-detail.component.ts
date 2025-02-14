import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../Service/pet.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule , CommonModule , FormsModule , ReactiveFormsModule, MatButtonModule , MatIconModule, RouterLink],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css'
})
export class PetDetailComponent {
  petForm!: FormGroup;
  imagePreview!: string | null;

  // @Output() edit = new EventEmitter<void>();
  // @Output() delete = new EventEmitter<void>();

  // onEdit() {
  //   this.edit.emit();
  // }

  // onDelete() {
  //   this.delete.emit();
  // }

}
