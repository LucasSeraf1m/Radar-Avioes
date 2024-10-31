import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {

  constructor(private dataGridService: DataGridService) {}

  linhas: { ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }[] = [
    { ID: 0, X: 0, Y: 0, R: 0, A: 0, V: 0, D: 0 }
  ];

  ngOnInit() {
    this.linhas = this.dataGridService.getLinhas();
  }

  addLinha() {
    const idNovo = this.linhas.length ? Math.max(...this.linhas.map(row => row.ID)) + 1 : 1;
    const newLinha = { ID: idNovo, X: 0, Y: 0, R: 0, A: 0, V: 0, D: 0 };
    this.dataGridService.addLinha(newLinha);
    this.linhas = this.dataGridService.getLinhas();
  }
}
