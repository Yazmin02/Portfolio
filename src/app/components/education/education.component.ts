import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  institution: string;
  degree: string;
  period: string;
  icon: string; // nueva propiedad para tu PNG
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educationList: Education[] = [
    { institution: 'Instituto Politécnico Nacional', 
      degree: 'Ingeniería en Sistemas Computacionales', period: '2020-2025', 
      icon: 'assets/icons/escom.png' },
    { institution: 'Bachillerato Técnico', 
      degree: 'Técnico en Informática', period: '2017-2020', 
      icon: 'assets/icons/ipn.png' }
  ];
  
  
}
