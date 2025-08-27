import { Resend } from 'resend';
import express from 'express';

const resend = new Resend(process.env['RESEND_API_KEY']);

export default async function handler(req: express.Request, res: express.Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

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
      from: 'Portfolio Contact <onboarding@resend.dev>', // Cambia esto por tu dominio verificado
      to: [process.env['CONTACT_EMAIL'] || 'yazmingonzalezmeneses@outlook.com'],
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
      console.error('Error enviando email:', error);
      return res.status(500).json({ 
        message: 'Error al enviar el mensaje' 
      });
    }

    return res.status(200).json({ 
      message: 'Mensaje enviado correctamente',
      data 
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
}
