import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {

  constructor(private dataGridService: DataGridService) {}

  linhas: {Selected: boolean; ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }[] = [
    {Selected: false, ID: 0, X: 0, Y: 0, R: 0, A: 0, V: 0, D: 0 }
  ];

  ngOnInit() {
    this.linhas = this.dataGridService.getLinhas();
  }
}
