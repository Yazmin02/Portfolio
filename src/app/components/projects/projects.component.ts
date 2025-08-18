import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'App de gestión de tiempo (Trabajo Terminal)',
      description: 'Aplicación nativa en Kotlin con MVVM, calendario, Pomodoro, reportes de productividad, colaboración y gamificación.',
      technologies: 'Kotlin, Android SDK, MVVM, SQLite, Jetpack'
    },
    {
      title: 'App de monitoreo IoT (Android)',
      description: 'Desarrollo para monitoreo en tiempo real de sensores conectados.',
      technologies: 'Kotlin, Android SDK, SQLite, Jetpack'
    },
    {
      title: 'Optimización de rutas logísticas',
      description: 'Algoritmo PSO con método DEB para mejorar asignación de rutas con restricciones.',
      technologies: 'Python'
    },
    {
      title: 'Desarrollo backend',
      description: 'Implementación de APIs RESTful para soporte de aplicaciones frontend y móviles.',
      technologies: 'Spring Boot, PHP'
    }
  ];
}
