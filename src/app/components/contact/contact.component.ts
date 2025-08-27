import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  email = 'yazmingonzalezmeneses@outlook.com';
  phone = '5565439086';
  github = 'https://github.com/Yazmin02';
  linkedin = 'https://www.linkedin.com/in/yazmin-gm';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async sendEmail() {
    if (this.contactForm.invalid) {
      this.showMessage('Por favor completa todos los campos correctamente', false);
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      const formData = this.contactForm.value;
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const response: any = await this.http.post('/api/contact', {
        name: formData.name,
        email: formData.email,
        message: `Asunto: ${formData.subject}\n\nMensaje:\n${formData.message}`
      }, { headers }).toPromise();

      this.showMessage('¡Mensaje enviado correctamente! Te responderé pronto.', true);
      this.contactForm.reset();
      
    } catch (error: any) {
      console.error('Error enviando mensaje:', error);
      const errorMessage = error.error?.message || 'Error al enviar el mensaje. Inténtalo de nuevo.';
      this.showMessage(errorMessage, false);
    } finally {
      this.isSubmitting = false;
    }
  }

  private showMessage(message: string, success: boolean) {
    this.submitMessage = message;
    this.submitSuccess = success;
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      this.submitMessage = '';
    }, 5000);
  }
}
