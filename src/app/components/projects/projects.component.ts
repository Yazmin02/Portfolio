import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string;
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'IoT Monitoring App',
      description: 'Monitoreo en tiempo real de sensores conectados.',
      technologies: 'Kotlin, Android SDK, SQLite, Jetpack',
      github: 'https://github.com/Yazmin02/IOTapp'
    },
    {
      title: 'Optimización de rutas logísticas',
      description: 'Algoritmo PSO con método DEB para mejorar asignación de rutas.',
      technologies: 'Python',
      github: 'https://github.com/Yazmin02/PSO'
    },
    {
      title: 'Backend para gestión de tiempo',
      description: 'APIs RESTful para la app de gestión de tiempo.',
      technologies: 'Spring Boot, Kotlin, SQLite',
      github: 'https://github.com/Yazmin02/systimebackend'
    }
  ];

  @ViewChildren('projCard') projCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Animación de entrada
    this.projCards.forEach((card, index) => {
      setTimeout(() => {
        card.nativeElement.classList.add('visible');
      }, index * 200); // delay escalonado
    });
  }

  openGitHub(githubUrl: string) {
    console.log('Abriendo GitHub:', githubUrl);
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  }
}
