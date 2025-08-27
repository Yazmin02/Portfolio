import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  role: string;
  company: string;
  year: string;
  summary: string;
  fullDescription: string;
  icon: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ExperienceComponent {
  selectedExperience: Experience | null = null;
  showModal = false;

  experiences: Experience[] = [
    {
      role: 'Becaria de Inteligencia Artificial',
      company: 'Nexu',
      year: '2025',
      icon: 'assets/icons/nexu.png',
      summary: 'Desarrollo de modelos de ML para detección de fraude documental y automatización de procesos financieros.',
      fullDescription: `• Automatización del procesamiento y clasificación de documentos financieros aplicando técnicas de NLP, extracción de texto y análisis de similitud.

• Implementación de modelos de machine learning (XGBoost, MLP) para detección de fraude documental, integrando análisis de QR, metadatos PDF y validaciones de datos.

• Desarrollo de scripts en Python para extracción, limpieza y normalización de datos provenientes de CSV, PDF y APIs.

• Integración de pipelines que conectaban el preprocesamiento, la inferencia del modelo y la generación de reportes de validación.

• Diseño de funciones para detección automática de herramientas de edición y alteraciones en documentos.

• Optimización de consultas y validaciones masivas mediante automatización de reglas y detección de anomalías.

• Documentación técnica de procesos, modelos y resultados, incluyendo métricas de desempeño y mejoras implementadas.`
    },
    {
      role: 'Colaboradora en Proyecto de Investigación',
      company: 'CIDETEC - IPN',
      year: '2024',
      icon: 'assets/icons/cidetec.jpg',
      summary: 'Investigación en algoritmos bioinspirados y desarrollo de software para optimización de problemas de ingeniería.',
      fullDescription: `• Participación en proyectos de desarrollo de software y optimización de algoritmos bioinspirados.

• Colaboración en investigación de algoritmos de optimización aplicados a problemas de ingeniería.

• Desarrollo de soluciones computacionales para análisis de datos y modelado matemático.

• Contribución a la documentación técnica y presentación de resultados de investigación.`
    }
  ];

  openModal(experience: Experience) {
    this.selectedExperience = experience;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedExperience = null;
  }
}
