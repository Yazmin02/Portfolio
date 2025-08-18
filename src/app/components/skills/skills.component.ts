import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string; // emoji o texto representativo
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
      category: 'Skills',
      skills: [
        { name: 'Python', icon: '🐍' },
        { name: 'Java', icon: '☕' },
        { name: 'Kotlin', icon: '🤖' },
        { name: 'JavaScript', icon: 'JS' },
        { name: 'React', icon: '⚛️' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'SQLite', icon: '🗄️' }
      ]
    }
  ];
}
