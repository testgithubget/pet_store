import {ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { PetService } from '../../Service/pet.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, FormsModule, MatLabel, MatButtonModule, MatCardModule, MatChipsModule, MatSelectModule, MatPaginatorModule, MatIconModule, CommonModule],

  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent {
  petlist: any[]=[];
  selectedStatus: string ="";

  constructor(public service: PetService){

  }

  ngOnInit(): void{
    this.getPetList();
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

 
    // this.service.getPetByStatus(this.selectedStatus).subscribe({
    //     next: res =>{
    //       console.log(this.selectedStatus)
    //       this.petlist = res
    //       console.log(res)
    //     },
    //     error: err =>{
    //       console.log(err)
    //     }
      
    //   });

    this.service.getPetByStatus(this.selectedStatus).subscribe({
      next: res => {
        console.log('Selected status:', this.selectedStatus);  // Log the selected status
        this.petlist = res;  // Store the response in petlist
        console.log('Pets fetched:', res);  // Log the response from the server
      },
      error: err => {
        console.error('Error fetching pets:', err);  // Log any errors
      }
    });
  }

}

