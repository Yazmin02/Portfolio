import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string; // ruta relativa a /assets/icons/
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
      category: 'Tech Skills',
      skills: [
        { name: 'Python', icon: 'assets/icons/python.png', description: 'Análisis de datos e Inteligencia Artificial' },
        { name: 'Java', icon: 'assets/icons/java.png', description: 'Desarrollo de software' },
        { name: 'Kotlin', icon: 'assets/icons/kotlin.png', description: 'Desarrollo móvil Android' },
        { name: 'JavaScript', icon: 'assets/icons/js.png', description: 'Programación Web' },
        { name: 'React', icon: 'assets/icons/react.png', description: 'Interfaces dinámicas' },
        { name: 'HTML', icon: 'assets/icons/html.png', description: 'Estructuras web' },
        { name: 'CSS', icon: 'assets/icons/css.png', description: 'Estilos, animaciones y responsive design' },
        { name: 'Node.js', icon: 'assets/icons/node.png', description: 'Backend y APIs' },
        { name: 'PostgreSQL', icon: 'assets/icons/postgresql.png', description: 'Bases de datos relacionales' },
        { name: 'MySQL', icon: 'assets/icons/mysql.png', description: 'Bases de datos y consultas avanzadas' },
        { name: 'SQLite', icon: 'assets/icons/sqlite.png', description: 'Bases de datos locales' }
      ]
    }
  ];
}
