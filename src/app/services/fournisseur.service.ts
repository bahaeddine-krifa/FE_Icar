import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../shared/models/fournisseur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  baseUrl= "http://localhost:8080";
  constructor(private http: HttpClient) { }

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/allFournisseur`);
  }

  public addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.baseUrl}/addFournisseur`,fournisseur);
  }
  
  public deleteFournisseur(fournisseurId:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteFournisseur/${fournisseurId}`);
  }

  public updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.baseUrl}/updateFournisseur`,fournisseur);
  }
}
