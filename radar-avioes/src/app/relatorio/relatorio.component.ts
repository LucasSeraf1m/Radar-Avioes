import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  relatorioEntries: any[] = [];
  private subscription: Subscription;

  constructor(private dataGridService: DataGridService) {
    this.subscription = this.dataGridService.relatorio$.subscribe(entries => {
      this.relatorioEntries = entries;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
