import { Component, AfterViewInit, HostListener, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { HeroComponent } from './components/hero/hero.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoadingComponent } from "./components/loading/loading.component";
import { ExperienceComponent } from './components/experience/experience.component';

interface Section { id: string; label: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    LoadingComponent,
    ExperienceComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  sections: Section[] = [
    { id: 'about', label: 'Inicio' },
    { id: 'education', label: 'Educación' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' },
  ];

  isLoading = true;
  menuOpen = false;
  activeSection = 'about';
  private isNavigating = false;
  private lastScrollX = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // Suscribirse a cambios de ruta para actualizar la sección activa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!this.isNavigating) {
        const url = event.urlAfterRedirects;
        const section = url.substring(1); // Remover el slash inicial
        if (section && this.sections.find(s => s.id === section)) {
          this.activeSection = section;
          this.scrollToSection(section);
        } else {
          this.activeSection = 'about';
          this.scrollToSection('about');
        }
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initializeApp();
  }

  private initializeApp(): void {
    console.log('App: Initializing application with hybrid navigation');
    
    // Siempre redirigir al primer componente (about) al cargar la página
    this.router.navigate(['/about'], { replaceUrl: true });
  }

  onLoadingFinished() {
    console.log('Loading finished - transitioning to main app');
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onMenuClick() {
    this.menuOpen = false;
  }

  navigateToSection(sectionId: string) {
    this.isNavigating = true;
    this.router.navigate(['/' + sectionId]);
    setTimeout(() => {
      this.isNavigating = false;
    }, 100);
  }

  private scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const sectionIndex = this.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      const scrollX = sectionIndex * window.innerWidth;
      window.scrollTo({
        left: scrollX,
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!isPlatformBrowser(this.platformId) || this.isNavigating) return;
    
    const currentScrollX = window.scrollX;
    
    // Solo procesar cambios de sección si hay scroll horizontal significativo
    if (Math.abs(currentScrollX - this.lastScrollX) > 100) {
      const windowWidth = window.innerWidth;
      const sectionIndex = Math.round(currentScrollX / windowWidth);
      
      if (sectionIndex >= 0 && sectionIndex < this.sections.length) {
        const newSection = this.sections[sectionIndex].id;
        if (newSection !== this.activeSection) {
          this.activeSection = newSection;
          // Actualizar la ruta cuando se hace scroll horizontal
          this.isNavigating = true;
          this.router.navigate(['/' + newSection], { replaceUrl: true });
          setTimeout(() => {
            this.isNavigating = false;
          }, 100);
          this.cdr.detectChanges();
        }
      }
      this.lastScrollX = currentScrollX;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.menuOpen) return; // No navegar si el menú está abierto

    const currentIndex = this.sections.findIndex(s => s.id === this.activeSection);
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          this.navigateToSection(this.sections[currentIndex - 1].id);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < this.sections.length - 1) {
          this.navigateToSection(this.sections[currentIndex + 1].id);
        }
        break;
      case 'PageUp':
        event.preventDefault();
        if (currentIndex > 0) {
          this.navigateToSection(this.sections[currentIndex - 1].id);
        }
        break;
      case 'PageDown':
        event.preventDefault();
        if (currentIndex < this.sections.length - 1) {
          this.navigateToSection(this.sections[currentIndex + 1].id);
        }
        break;
    }
  }

  ngOnDestroy(): void {
    // Cleanup si es necesario
  }
}
