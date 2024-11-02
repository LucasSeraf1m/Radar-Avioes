import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {
  private data: {Selected: boolean; ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }[] = [];
  private dataSubject = new BehaviorSubject(this.data);

  getLinhas() {
    return this.data;
  }

  getLinhasSelecionadas(){
      let linhas = this.data.filter(linha => linha.Selected);
      return linhas;
    }
  
  getDataObservable() {
    return this.dataSubject.asObservable();
  }

  addLinha(newLinha: {Selected: boolean; ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }) {
    this.data.push(newLinha);
    this.dataSubject.next(this.data);
  }
}
