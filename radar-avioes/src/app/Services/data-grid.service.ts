import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {
  private data: { ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }[] = [];

  getLinhas() {
    return this.data;
  }

  addLinha(newLinha: { ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }) {
    this.data.push(newLinha);
  }

  limparDados() {
    this.data = [];
  }
}
