import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  isOnAdd: boolean = false;
  isOnList: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/add') {
          this.isOnAdd = true;
          this.isOnList = false;
        } else if (event.url === '/list') {
          this.isOnAdd = false;
          this.isOnList = true;
        }else{
          this.isOnAdd = true;
          this.isOnList = true;
        }
      }
    });
  }
}
