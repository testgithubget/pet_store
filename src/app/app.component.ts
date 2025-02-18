import { Component } from '@angular/core';
import { MenuComponent } from "./Components/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';
}
