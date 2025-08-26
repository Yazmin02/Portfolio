import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Asegurar que la aplicación esté estable después del bootstrap
    console.log('Application bootstrapped successfully');
  })
  .catch((err) => console.error('Bootstrap error:', err));
