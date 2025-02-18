<<<<<<< HEAD
import {Component} from '@angular/core';


=======
import {ChangeDetectionStrategy, Component, Injectable, viewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { PetService } from '../../Service/pet.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu'

import { Subject } from 'rxjs';



interface Status {
  value: string;
  viewValue: string;
}
>>>>>>> 4e7bd13dcc29959884b181a4ba612b66548c1c45

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, FormsModule, MatLabel, MatButtonModule, MatCardModule, MatChipsModule, MatSelectModule, MatPaginatorModule, MatIconModule, CommonModule, MatMenuModule],

  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css',
})
export class PetListComponent {
<<<<<<< HEAD
 
=======
  petlist: any[]=[];
  selectedStatus: string ="available";
  selectedId: number = 0;
  petById: any;
  showMe: boolean = false;

  //pagination component
  curPage = 1;
  pageSize = 9;

  constructor(public service: PetService){

  }

  ngOnInit(): void{
    this.getPetList();
    this.getPetById();
  }

  status: Status[] = [
    {value: 'available', viewValue: 'Available'},
    {value: 'pending', viewValue: 'Pending'},
    {value: 'sold', viewValue: 'Sold'},
  ];

  getPetList(): void{

    if (!this.selectedStatus) {
      console.warn('Please select a pet status.');
      return; // Early return if no status is selected
    }

    // Clear the current pet list before making the new request
    this.petlist = [];
    this.petById=''
    this.showMe =false;
    this.selectedId = 0;


    this.service.getPetByStatus(this.selectedStatus).subscribe({
      next: res => {
        console.log('Selected status:', this.selectedStatus);  // Log the selected status
        this.petlist = res;  // Store the response in petlist
        this.curPage=1;
        console.log('Pets fetched:', res);  // Log the response from the server
      },
      error: err => {
        console.error('Error fetching pets:', err);  // Log any errors
      }
    });

     }
     getPetById(): void{

      if (!this.selectedId) {
        console.warn('Please input a valid ID.');
        return; // Early return if no status is selected
      }
  
      // Clear the current pet list before making the new request
      this.petlist = [];
      this.hideDiv()
  
  
      this.service.getPet(this.selectedId).subscribe({
        next: res => {
          console.log('Selected status:', this.selectedId);  // Log the selected status
          this.petById = res;  // Store the response in petlist
          this.selectedStatus ="";
          console.log('Pets fetched:', res);  // Log the response from the server
        },
        error: err => {
          console.error('Error fetching pets:', err);  // Log any errors
        }
      });
  
      
       }

       numberOfPages() {
       return Math.ceil(this.petlist.length / this.pageSize);
      //  return this.petlist.length;
      }
        goToPage(pageNumber: number): void {
            if (pageNumber >= 1 && pageNumber <= this.numberOfPages()) {
                this.curPage = pageNumber;
            }
        } 
        hideDiv() {
          this.showMe = true;
      }

>>>>>>> 4e7bd13dcc29959884b181a4ba612b66548c1c45
}

