import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../Model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  baseUrl = 'https://petstore.swagger.io/v2/pet';
  constructor(private http: HttpClient) { }

  uploadPetImage(petId: number, file: File, additionalMetadata?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (additionalMetadata) {
      formData.append('additionalMetadata', additionalMetadata);
    }
    
    return this.http.post(`${this.baseUrl}/${petId}/uploadImage`, formData);
  }


  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/${id}`);
  }

  getPetByStatus(status: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/${status}`);
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, pet);
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.baseUrl}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
