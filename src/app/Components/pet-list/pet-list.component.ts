import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PetService } from '../../Service/pet.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatLabel,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
  ],

  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css',
})
export class PetListComponent {
 
}
