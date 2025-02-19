import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})

export class SplashComponent {
constructor(public route: Router) {}

ngOnInit(): void {
  setTimeout(() => {
    this.navigate();
  }, 3000);
}


navigate(){
  this.route.navigate(['list']);
  }
}
