import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent {
  @ViewChild('cartesianCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private dataSubscription!: Subscription;

  private imageObj = new Image();

  constructor(private dataGridService: DataGridService) {}

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.drawPlane();

    // Inscrever-se para mudanças nos dados
    this.dataSubscription = this.dataGridService.getDataObservable().subscribe(data => {
      this.clearCanvas();
      this.drawPlane();
      this.plotPoints(data);
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe(); // Limpar a assinatura para evitar vazamentos de memória
  }

  private drawPlane() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    // Desenhar eixos
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, 0); // Eixo Y
    this.ctx.lineTo(width / 2, height);
    this.ctx.moveTo(0, height / 2); // Eixo X
    this.ctx.lineTo(width, height / 2);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private plotPoints(data: { ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }[]) {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    this.imageObj.src = 'assets/boeing_454.svg';

    data.forEach(point => {
      const x = centerX + point.X * 2.34; // Fator de escala para visibilidade
      const y = centerY - point.Y * 2.34; // Inverter Y para orientação cartesiana

      this.ctx.drawImage(this.imageObj, x - 10, y - 10, 20, 20);
    });
  }
}
