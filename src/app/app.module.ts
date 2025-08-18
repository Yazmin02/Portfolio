import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// ng-particles
import { NgParticlesModule } from "ng-particles";

// Importa los componentes standalone
import { HeroComponent } from './components/hero/hero.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgParticlesModule, // <-- agregamos aquí
    HeroComponent,
    EducationComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
    ],
})
export class AppModule {}
