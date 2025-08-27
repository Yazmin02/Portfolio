import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Resend configuration - API key hardcoded para desarrollo
const resend = new Resend('re_dPFUfi2T_KGv5h8LddzCM4dCwZXXvFKeK');

console.log('🚀 Servidor de desarrollo iniciado');
console.log('📧 API key configurada para desarrollo');

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('📨 Recibiendo mensaje:', { name, email, message: message.substring(0, 50) + '...' });

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Email inválido' 
      });
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['yazmingonzalezmeneses@outlook.com'],
      subject: `Nuevo mensaje de ${name} desde tu portfolio`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Enviado desde tu portfolio web</small></p>
      `,
      replyTo: email
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return res.status(500).json({ 
        message: 'Error al enviar el mensaje' 
      });
    }

    console.log('✅ Email enviado correctamente:', data);
    return res.status(200).json({ 
      message: 'Mensaje enviado correctamente',
      data 
    });

  } catch (error) {
    console.error('❌ Error en el servidor:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${port}`);
  console.log(`📧 API de contacto disponible en http://localhost:${port}/api/contact`);
});
