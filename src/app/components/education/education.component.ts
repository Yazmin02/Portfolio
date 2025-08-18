import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import necesario para *ngFor

interface Education {
  institution: string;
  degree: string;
  period: string;
}

@Component({
  selector: 'app-education',
  standalone: true, // ✅ Ahora es un componente standalone
  imports: [CommonModule], // ✅ Importa CommonModule para directivas como *ngFor
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educationList: Education[] = [
    { institution: 'Instituto Politécnico Nacional', degree: 'Ingeniería en Sistemas Computacionales (2020-2025 en proceso)', period: '2020-2025' },
    { institution: 'Bachillerato Técnico', degree: 'Técnico en Informática', period: '2017-2020' }
  ];
}
