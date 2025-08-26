import { Component, AfterViewInit, HostListener, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoadingComponent } from "./components/loading/loading.component";

interface Section { id: string; label: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  sections: Section[] = [
    { id: 'about', label: 'Inicio' },
    { id: 'education', label: 'Educación' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' }
  ];

  isLoading = true;
  menuOpen = false;
  activeSection = 'about';
  private observer: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Inicializar directamente sin requestAnimationFrame para evitar problemas
    this.initializeApp();
  }

  private initializeApp(): void {
    const main = document.querySelector('main') as HTMLElement;

    // Ajustamos altura del body para permitir scroll vertical que mueva horizontal
    if (main) {
      const sectionCount = this.sections.length;
      const viewportWidth = window.innerWidth;
      const totalWidth = sectionCount * viewportWidth;
      
      // Restamos la altura de la ventana para que no haya espacio extra al final
      document.body.style.height = `${totalWidth - window.innerHeight}px`;
    }

    // IntersectionObserver para fade-in
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px'
    });
    
    // Observar las secciones después de un pequeño delay para asegurar que estén renderizadas
    setTimeout(() => {
      if (this.observer) {
        document.querySelectorAll('.fade-in').forEach(el => this.observer!.observe(el));
      }
    }, 100);
  }

  onLoadingFinished() { 
    this.isLoading = false; 
    this.cdr.detectChanges();
  }
  
  toggleMenu() { 
    this.menuOpen = !this.menuOpen; 
    this.cdr.detectChanges();
  }

  scrollToSection(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const section = document.getElementById(id);
    if (section) {
      const offsetLeft = section.offsetLeft;
      window.scrollTo({ top: offsetLeft, behavior: 'smooth' });
    }
    this.activeSection = id;
    this.menuOpen = false;
    this.cdr.detectChanges();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const currentIndex = this.sections.findIndex(s => s.id === this.activeSection);
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          this.scrollToSection(this.sections[currentIndex - 1].id);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < this.sections.length - 1) {
          this.scrollToSection(this.sections[currentIndex + 1].id);
        }
        break;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const main = document.querySelector('main') as HTMLElement;
    if (main) main.style.transform = `translateX(-${window.scrollY}px)`;

    const scrollPos = window.scrollY + window.innerHeight / 2;
    for (let section of this.sections) {
      const el = document.getElementById(section.id);
      if (el && el.offsetLeft <= scrollPos && (el.offsetLeft + el.offsetWidth) > scrollPos) {
        this.activeSection = section.id;
        this.cdr.detectChanges();
      }
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Recalcular la altura del body cuando cambie el tamaño de la ventana
    const main = document.querySelector('main') as HTMLElement;
    if (main) {
      const sectionCount = this.sections.length;
      const viewportWidth = window.innerWidth;
      const totalWidth = sectionCount * viewportWidth;
      
      document.body.style.height = `${totalWidth - window.innerHeight}px`;
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
