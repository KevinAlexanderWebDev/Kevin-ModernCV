<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="80" height="80">
  <h3 align="center">Mi Portafolio Profesional</h3>

  <p align="center">
    Un portafolio web escalable, ultra-rápido y con tipado estricto construido en Astro 4.x
    <br />
    <a href="https://tu-usuario.github.io/short-sphere/"><strong>Ver Demo en vivo »</strong></a>
    <br />
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Astro-0C1424?style=for-the-badge&logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <br>
  <img src="https://img.shields.io/github/actions/workflow/status/tu-usuario/short-sphere/deploy.yml?style=for-the-badge&logo=github-actions&label=Deploy" alt="Deploy">
</div>

---

## 🚀 Características Principales (Features)

* **Arquitectura de Islas (Island Architecture)**: Interactividad en cliente (`Dark Mode Toggle`, `Mobile Menu`) mientras que el resto de la interfaz (Cards, Layout) se sirve como HTML estático puro de ~0 KB de JavaScript.
* **Content Collections**: Gestión de Proyectos y Certificados separados de la UI (mediante JSON), con esquemas de validación Zod (`src/content/config.ts`). ¡Adiós a los _TypeErrors_ en runtime por datos faltantes!
* **View Transitions**: Navegación tipo *Single Page Application* fluida sin recargas pesadas, gestionada nativamente por el Router de Astro (`astro:transitions`).
* **Diseño Premium**: Modos Oscuro y Claro autogestionables mediante una pequeña inyección en el `<head>` para prevenir FOUC (Flash of Unstyled Content).
* **SEO Nativo**: Configuración pre-renderizada de meta tags open-graph para mejor rankeo en buscadores.
* **Optimización de Assets Automática**: Uso de `<Image />` pre-empaquetado, generando WebP/AVIF bajo demanda en etapa de Build.

---

## 🛠 Instalación y Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/short-sphere.git
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Levanta el servidor temporal (Vite reloader incluído):
   ```bash
   npm run dev
   ```

## 📦 Despliegue en GitHub Pages

Este proyecto ya incluye el *workflow* de `GitHub Actions` configurado en `.github/workflows/deploy.yml`. 
Para su correcto funcionamiento, realiza lo siguiente en tu repositorio en la Web de Github:
1. Ve a **Settings > Pages** de tu repositorio.
2. En la sección *Build and deployment > Source*, selecciona **GitHub Actions**.
3. Haz un push a la rama `main`, la Action de Astro pre-construirá la web y la desplegará gratis y con SSL.

--- 

_Diseñado y pensado con principios Solid y Separación de Responsabilidades usando Vanilla CSS y Astro._
