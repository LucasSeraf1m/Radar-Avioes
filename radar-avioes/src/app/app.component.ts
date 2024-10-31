import { Component } from '@angular/core';
import { DataGridService } from './Services/data-grid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radar-avioes';

  constructor(private dataGridService: DataGridService) {}

  limparDados() {
    this.dataGridService.limparDados();
  }
}
