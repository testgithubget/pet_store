import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injectable,
  ViewChild,
  viewChild,
  ViewContainerRef,
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
import { MatMenuModule } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, Routes } from '@angular/router';
import { Pet } from '../../Model/pet.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    MatMenuModule,
    SpinnerComponent,
    ToastrModule
  
],

  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css',
})
export class PetListComponent {
  petlist: any[] = [];
  selectedStatus: string = 'available';
  selectedId: any ;
  petById: any;
  showMe: boolean = false;
  isLoading: boolean = true;

  //pagination component
  curPage = 1;
  pageSize = 12;


  
 
  constructor(public service: PetService, public route: Router ,private toaster: ToastrService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; 
    }, 3000);

    this.getPetList();
    // this.getPetById();
  }

 

  status: Status[] = [
    { value: 'available', viewValue: 'Available' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'sold', viewValue: 'Sold' },
  ];

  getPetList(): void {
    this.isLoading = true; 

    if (!this.selectedStatus) {
      console.warn('Please select a pet status.');
      return;
    }
  
    this.petlist = [];
    this.petById = '';
    this.showMe = false;
    this.selectedId = '';
  
    this.service.getPetByStatus(this.selectedStatus).subscribe({
      next: (res) => {

        console.log('Selected status:', this.selectedStatus);
        this.petlist = this.service.filterDuplicatePets(res);
        this.curPage = 1;
        console.log('Pets fetched:', res);
      },
      error: (err) => {
        console.error('Error fetching pets:', err);
      },
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  
  
  
  getPetById(): void {
    if (!this.selectedId) {
      console.warn('Please input a valid ID.');
      this.toaster.warning('No Pet Id Entered');
      return;
    }

    this.petlist = [];
    this.hideDiv();
    this.service.getPet(this.selectedId).subscribe({
      next: (res) => {
        console.log('Selected status:', this.selectedId);
        this.petById = res;
        this.selectedStatus = '';
        console.log('Pets fetched:', res);
      },
      error: (err) => {
        this.showMe = false;
        console.error('Error fetching pets:', err);
        this.getPetList();
        this.toaster.error('Pet Not Found');
      },
    });
  }

  numberOfPages() {
    if(this.petlist.length===0){
      return 1
    }else{
    return Math.ceil(this.petlist.length / this.pageSize);
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.numberOfPages()) {
      this.curPage = pageNumber;
    }
  }

  hideDiv() {
    this.showMe = true;
  }

  navigate(id: string){
    this.route.navigate(['detail', id]);
    }
}
