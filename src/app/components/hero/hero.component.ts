import { Component } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgParticlesModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  name = 'Yazmín Berenice González Meneses';
  title = 'Ingeniera en Sistemas Computacionales';
  description = 'Ingeniera en Sistemas Computacionales egresada del IPN, con experiencia en análisis de datos, inteligencia artificial, desarrollo web, frontend y backend, así como desarrollo móvil Android. Me especializo en construir soluciones tecnológicas eficientes y escalables. Busco contribuir en proyectos multidisciplinarios que requieran habilidades técnicas diversas y trabajo colaborativo.';

  // Declaramos como any para evitar problemas de tipos
  particlesOptions: any = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 4 } },
      links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 1, direction: "none", straight: false, outModes: "out" }
    },
    detectRetina: true
  };
}
