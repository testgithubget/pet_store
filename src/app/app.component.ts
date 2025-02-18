import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetListComponent } from "./Components/pet-list/pet-list.component";
import { NgModule } from '@angular/core';
import { MenuComponent } from "./Components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet],
=======
  imports: [CommonModule, PetListComponent, MenuComponent],
>>>>>>> 4e7bd13dcc29959884b181a4ba612b66548c1c45
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';
}
