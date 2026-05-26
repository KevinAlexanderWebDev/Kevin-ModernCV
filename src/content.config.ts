import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/* 
  MASTERCLASS: APIs de Contenido (Content Layer vs Legacy)
  Astro 5+ introdujo la "Content Layer API", una forma mucho más potente de cargar datos
  no solo desde carpetas locales sino desde APIs, bases de datos o CMS remotos.
  
  Por esto, el archivo se reubicó de "src/content/config.ts" a "src/content.config.ts" (en la raíz de src)
  y requiere que especifiquemos CÓMO cargar esos archivos explícitamente usando "loader".
*/

// Esquema para Colección de Proyectos
const projectsCollection = defineCollection({
  // 'glob' cargará automáticamente todo archivo .json en esa ruta relativa.
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().max(250),
    imageObj: image().optional(), 
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    order: z.number().default(0) 
  }),
});

// Esquema para Certificados
const certificatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certificates" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(), 
    url: z.string().url().optional(),
    imageObj: image().optional()
  })
});

// Exportamos las colecciones para que Astro las registre globalmente
export const collections = {
  projects: projectsCollection,
  certificates: certificatesCollection,
};
