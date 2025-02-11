import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PetListComponent } from "./Components/pet-list/pet-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PetListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';
}
