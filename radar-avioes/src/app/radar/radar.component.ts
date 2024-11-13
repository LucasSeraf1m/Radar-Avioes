import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css'],
})
export class RadarComponent {
  @ViewChild('cartesianCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private dataSubscription!: Subscription;

  private imageObj = new Image();

  constructor(private dataGridService: DataGridService) {}

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.drawPlane();

    // Inscrever-se para mudanças nos dados
    this.dataSubscription = this.dataGridService
      .getDataObservable()
      .subscribe((data) => {
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

    // Definir a escala (10 unidades correspondem a 50 pixels)
    const scale = 2.33; // 1 unidade = 5 pixels (ajuste conforme necessário)

    // Desenhar linhas verticais de 10 unidades em escala
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#967444'; // Cor das linhas
    this.ctx.lineWidth = 1;

    const step = 10; // 10 unidades no plano cartesiano (em escala)

    // Linhas verticais à esquerda e à direita do eixo Y
    for (let x = width / 2 + scale * step; x < width; x += scale * step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let x = width / 2 - scale * step; x > 0; x -= scale * step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }

    // Desenhar linhas horizontais de 10 unidades em escala
    for (let y = height / 2 + scale * step; y < height; y += scale * step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    for (let y = height / 2 - scale * step; y > 0; y -= scale * step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }

    this.ctx.stroke();

    // Desenhar eixos
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, 0); // Eixo Y
    this.ctx.lineTo(width / 2, height);
    this.ctx.moveTo(0, height / 2); // Eixo X
    this.ctx.lineTo(width, height / 2);
    this.ctx.strokeStyle = '#967444';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private plotPoints(
    data: {
      ID: number;
      X: number;
      Y: number;
      R: number;
      A: number;
      V: number;
      D: number;
    }[]
  ) {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    this.imageObj.src = 'assets/boeing_747.svg';

    data.forEach((point) => {
      const x = centerX + point.X * 2.34;
      const y = centerY - point.Y * 2.34;

      const angleInRadians = (point.D * Math.PI) / 180;

      this.ctx.save();

      this.ctx.translate(x, y);

      this.ctx.rotate(-angleInRadians);

      this.ctx.drawImage(this.imageObj, -10, -10, 20, 20);

      this.ctx.restore();
    });
  }
}
