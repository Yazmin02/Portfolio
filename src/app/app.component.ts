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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // Suscribirse a cambios de ruta para actualizar la sección activa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const section = url.substring(1); // Remover el slash inicial
      if (section && this.sections.find(s => s.id === section)) {
        this.activeSection = section;
      } else {
        this.activeSection = 'about';
      }
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initializeApp();
  }

  private initializeApp(): void {
    console.log('App: Initializing application with route-based navigation');
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
    this.router.navigate(['/' + sectionId]);
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
    }
  }

  ngOnDestroy(): void {
    // Cleanup si es necesario
  }
}
