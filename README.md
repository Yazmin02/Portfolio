# Portfolio Personal - Angular + Vercel

Portfolio personal desarrollado con Angular 19, desplegado en Vercel con funcionalidad de formulario de contacto usando Resend.

## 🚀 Características

- **Angular 19** con SSR (Server-Side Rendering)
- **Diseño Responsivo** y moderno
- **Formulario de Contacto** funcional con Resend
- **Despliegue Automático** en Vercel
- **Optimización SEO** con prerendering

## 📧 Configuración del Formulario de Contacto

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta
2. Verifica tu dominio de email o usa el dominio de prueba `onboarding@resend.dev`

### 2. Obtener API Key

1. En el dashboard de Resend, ve a "API Keys"
2. Crea una nueva API key
3. Copia la key generada

### 3. Configurar Variables de Entorno

#### Para Desarrollo Local:
Crea un archivo `.env.local` en la raíz del proyecto:
```env
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_EMAIL=tu-email@ejemplo.com
```

#### Para Vercel:
1. Ve a tu proyecto en Vercel Dashboard
2. Ve a "Settings" > "Environment Variables"
3. Agrega las siguientes variables:
   - `RESEND_API_KEY`: Tu API key de Resend
   - `CONTACT_EMAIL`: Tu email donde recibirás los mensajes

### 4. Personalizar Email

Edita el archivo `api/contact/index.ts` para personalizar:
- El email de origen (`from`)
- El asunto del email
- El template HTML del mensaje

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servir en desarrollo
npm start

# Build para producción
npm run build

# Build para Vercel
npm run vercel-build
```

## 📦 Despliegue

El proyecto está configurado para desplegar automáticamente en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. ¡Listo! Se desplegará automáticamente

## 🎨 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── contact/          # Formulario de contacto
│   │   ├── hero/            # Sección principal
│   │   ├── about/           # Sobre mí
│   │   ├── skills/          # Habilidades
│   │   ├── projects/        # Proyectos
│   │   └── experience/      # Experiencia
│   └── pages/
├── assets/
│   └── icons/              # Iconos PNG
api/
└── contact/
    └── index.ts            # API del formulario
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: Angular 19, TypeScript, SCSS
- **Backend**: Node.js, Express, Resend
- **Despliegue**: Vercel
- **Email**: Resend API

## 📝 Licencia

Este proyecto es de uso personal y educativo.
