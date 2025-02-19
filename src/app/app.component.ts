import { Component } from '@angular/core';
import { MenuComponent } from "./Components/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from "./Components/spinner/spinner.component";
import { SplashComponent } from "./Components/Splash/splash.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, SplashComponent , SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';

  // isLoading = true;
}
