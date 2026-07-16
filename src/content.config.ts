import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* 
  MASTERCLASS: APIs de Contenido (Content Layer vs Legacy)
  Astro 5+ introdujo la "Content Layer API", una forma mucho más potente de cargar datos
  no solo desde carpetas locales sino desde APIs, bases de datos o CMS remotos.
  
  Por esto, el archivo se reubicó de "src/content/config.ts" a "src/content.config.ts" (en la raíz de src)
  y requiere que especifiquemos CÓMO cargar esos archivos explícitamente usando "loader".
*/

// ============================================
// COLECCIÓN: PROYECTOS (11 items reales)
// ============================================
const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Imagen principal (desktop)
    imageObj: z.string().optional(),
    hoverImageObj: z.string().optional(),
    mobileImages: z.array(z.string()).optional(),
    // Tech stack
    tags: z.array(z.string()),
    // URLs
    repoUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    // Metadatos
    featured: z.boolean().default(false),
    status: z.enum(["live", "wip", "archived"]).default("live"),
    order: z.number().default(0),
    // Para i18n: keys de traducción (opcional, si no usa content i18n)
    titleKey: z.string().optional(),
    descriptionKey: z.string().optional(),
  }),
});

// ============================================
// COLECCIÓN: CERTIFICADOS (8 items reales)
// ============================================
const certificatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certificates" }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(), // ISO format: "2025-03-15"
    // Imagen completa (para modal zoom)
    imageObj: z.string().optional(),
    thumbnailObj: z.string().optional(),
    url: z.string().optional(),
    order: z.number().default(0),
    titleKey: z.string().optional(),
    issuerKey: z.string().optional(),
  })
});

// ============================================
// COLECCIÓN: SKILLS (23 skills en 3 categorías)
// ============================================
const skillsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
  schema: z.object({
    name: z.string(),
    category: z.enum(["technical", "soft", "tools"]),
    // Nombre de icono (lucide, simple-icons, o custom SVG filename)
    icon: z.string().optional(),
    order: z.number().default(0),
    // Para i18n
    nameKey: z.string().optional(),
  }),
});

// ============================================
// COLECCIÓN: PERSONAL (1 entry - tu info)
// ============================================
const personalCollection = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/personal" }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    bio: z.array(z.string()),
    photo: z.string(), // ruta relativa: "@/assets/images/profile.webp"
    resumeUrl: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    social: z.object({
      github: z.string(),
      linkedin: z.string(),
      facebook: z.string().optional(),
      whatsapp: z.string().optional(),
    }),
    // i18n keys
    titleKey: z.string().optional(),
    taglineKey: z.string().optional(),
    bioKeys: z.array(z.string()).optional(),
  }),
});

// ============================================
// COLECCIÓN: TRADUCCIONES (i18n flat JSON)
// ============================================
const translationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/i18n" }),
  schema: z.any(), // JSON plano sin validación estricta
});

// Exportamos las colecciones para que Astro las registre globalmente
export const collections = {
  projects: projectsCollection,
  certificates: certificatesCollection,
  skills: skillsCollection,
  personal: personalCollection,
  translations: translationsCollection,
};