import { Component } from '@angular/core';
import { MenuComponent } from "./Components/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { SpinnerComponent } from "./Components/spinner/spinner.component";
=======
import { SplashComponent } from "./Components/Splash/splash.component";
>>>>>>> 9e0b1c569431bd8db9f38109c0ccac799e230de9

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, MenuComponent, SpinnerComponent],
=======
  imports: [RouterOutlet, MenuComponent, SplashComponent],
>>>>>>> 9e0b1c569431bd8db9f38109c0ccac799e230de9
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';

  // isLoading = true;
}
