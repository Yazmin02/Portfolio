import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string; // emoji o texto representativo
  description: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
  {
    category: '',
    skills: [
      { name: 'Python', icon: '🐍', description: 'Análisis de datos e Inteligencia Artificial' },
      { name: 'Java', icon: '☕', description: 'Desarrollo' },
      { name: 'Kotlin', icon: '🤖', description: 'Desarrollo' },
      { name: 'JavaScript', icon: 'JS', description: 'Web' },
      { name: 'React', icon: '⚛️', description: 'Interfaces dinámicas' },
      { name: 'HTML', icon: '🌐', description: 'Estructuras web' },
      { name: 'CSS', icon: '🎨', description: 'Estilos, animaciones y responsive design' },
      { name: 'Node.js', icon: '🟢', description: 'Backend' },
      { name: 'PostgreSQL', icon: '🐘', description: 'Bases de datos relacionales' },
      { name: 'MySQL', icon: '🐬', description: 'Bases de datos y consultas avanzadas' },
      { name: 'SQLite', icon: '🗄️', description: 'Bases de datos locales' }
    ]
  }
  ];

}
