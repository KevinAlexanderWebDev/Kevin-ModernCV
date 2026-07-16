// Este script tiene la funcion de mapear imagenes | Se recomienda mejor usar un estandar para nombrar imagenes, forma tipo normal-case: X 'Foto de Perfil.png' -> :) 'profile-photo.webp'
import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = '../My-Porftolio_Old+/Cv-Kevin-Alexander/assets';
const OUTPUT_DIR = 'src/assets/images';

const CONFIG = {
    webp: { quality: 85, effort: 6 },
    avif: { quality: 70, effort: 9 },
    widths: [400, 800, 1200], 
    //Responsive
    thumbnail: { width: 300, height: 200, fit: 'cover' },
};

const FILE_MAP = {
    // Profile
    'Foto de CV Recortada 1.jpg': 'profile.webp',
    'Foto de CV Recortada.jpg': 'profile-alt.webp',
    
    // Projects - PYMETECH
    'Pymetech - Tienda profile image.jpg': 'projects/pymetech/desktop-1.webp',
    'Pymetech - Tienda screen2.jpg': 'projects/pymetech/desktop-2.webp',
    'Pymetech - Tienda profile image mobile.jpg': 'projects/pymetech/mobile-1.webp',
    'Pymetech - Tienda screen2 mobile.jpg': 'projects/pymetech/mobile-2.webp',
    
    // Projects - La Nuestra
    'La_Nuestra1.jpg': 'projects/la-nuestra/desktop-1.webp',
    'La_Nuestra2.jpg': 'projects/la-nuestra/desktop-2.webp',
    'La_Nuestra1_mobile.png.jpg': 'projects/la-nuestra/mobile-1.webp',
    'La_Nuestra_mobile2.png': 'projects/la-nuestra/mobile-2.webp',
    
    // Projects - My Health App
    'My-health-app.jpg': 'projects/my-health-app/desktop-1.webp',
    'My-health-app.2jpg.jpg': 'projects/my-health-app/desktop-2.webp',
    'My-health-app-mobile.jpg': 'projects/my-health-app/mobile-1.webp',
    'My-health-app-mobile2.jpg': 'projects/my-health-app/mobile-2.webp',
    
    // Projects - Sembrando Agua
    'Sembrando_agua1.png': 'projects/sembrando-agua/desktop-1.webp',
    'Sembrando_agua2.png': 'projects/sembrando-agua/desktop-2.webp',
    'Sembrando_agua1_mobile.png': 'projects/sembrando-agua/mobile-1.webp',
    'Sembrando_agua2_mobile.png': 'projects/sembrando-agua/mobile-2.webp',
    
    // Projects - For My Dad
    'brave_screenshot_kevinalexanderwebdev.github.io-seccion-recuerdos.png': 'projects/for-my-dad/desktop-1.webp',
    'brave_screenshot_kevinalexanderwebdev.github.io-seccion-cards.png': 'projects/for-my-dad/desktop-2.webp',
    'brave_screenshot_kevinalexanderwebdev.github.io-home-mobile.png': 'projects/for-my-dad/mobile-1.webp',
    'brave_screenshot_kevinalexanderwebdev.github.io-login-mobile.png': 'projects/for-my-dad/mobile-2.webp',
    
    // Projects - For My Girl
    'for-my-girl-loginroute.png': 'projects/for-my-girl/desktop-1.webp',
    'for-my-girl-homeroute.png': 'projects/for-my-girl/desktop-2.webp',
    'for-my-girl-biblotecaroute.png': 'projects/for-my-girl/desktop-3.webp',
    'for-my-girl-homeroute-mobile.png': 'projects/for-my-girl/mobile-1.webp',
    'for-my-girl-creaturecuerdo-mobile.png': 'projects/for-my-girl/mobile-2.webp',
    
    // Projects - Yellow Flower Day
    'yellow-flower-day.jpg': 'projects/yellow-flower-day/desktop-1.webp',
    'yellow-flower-day2.jpg': 'projects/yellow-flower-day/desktop-2.webp',
    'flower-day-mobile.png': 'projects/yellow-flower-day/mobile-1.webp',
    'flower-day-mobile2.png': 'projects/yellow-flower-day/mobile-2.webp',
    
    // Projects - CV Propio
    'encabezado-cvpropio.png': 'projects/cv-propio/desktop-1.webp',
    'cuerpo-cvpropio.png': 'projects/cv-propio/desktop-2.webp',
    'encabezado-cvpropio-mobile.png': 'projects/cv-propio/mobile-1.webp',
    'cuerpo-cvpropio-mobile.png': 'projects/cv-propio/mobile-2.webp',
    
    // Projects - CV Isis
    'encabezado-cvisis.png': 'projects/cv-isis/desktop-1.webp',
    'cuerpo-cvisis.png': 'projects/cv-isis/desktop-2.webp',
    'encabezado-cvisis-mobile.png': 'projects/cv-isis/mobile-1.webp',
    'contactame-cvisis-mobile.png': 'projects/cv-isis/mobile-2.webp',
    
    // Projects - CV Naidelin
    'cv-naidelin-header.png': 'projects/cv-naidelin/desktop-1.webp',
    'cv-naidelin-header-black.png': 'projects/cv-naidelin/desktop-2.webp',
    'cv-naidelin-header-mobile.png': 'projects/cv-naidelin/mobile-1.webp',
    'cv-naidelin-placeholder-mobile.png': 'projects/cv-naidelin/mobile-2.webp',
    
    // Projects - Calculadora Python
    'Calculadora-basica-python.png': 'projects/calculadora-python/desktop-1.webp',
    'Python-calculadora.png': 'projects/calculadora-python/desktop-2.webp',

    // Projects - Paused Projects
    'fit-coach-burguer-menu.png': 'projects/paused-projects/fit-couch-desktop-2.webp',
    'fit-coach-home.png' : 'projects/paused-projects/fit-couch-desktop-1.webp',
    'fit-coach-home-mobile.png' : 'projects/paused-projects/fit-ccuch-mobile-1.webp',
    'fit-coach-burguer-menu.png' : 'projects/paused-projects/fit-couch-mobile-2.webp',
    'Fuel-by-peanut.png' : 'projects/paused-projects/fuel-by-peanut-desktop.webp',
    'Fuel-by-peanut-mobile.png' : 'projects/paused-projecs/fuel-by-peanut-mobile/webp',
    
    // Certificates
    'Certificado - Curso a fondo de GitHub_page-0001.jpg': 'certificates/github-course.webp',
    'Certificado-Oficial-Python-SantanderOA.png': 'certificates/python-santander.webp',
    'diploma-terminacion.png': 'certificates/diploma-terminacion.webp',
    'carta-terminacion.png': 'certificates/carta-pasante.webp',
    'Curso-Desarrollo-IA.png': 'certificates/ia-big-school.webp',
    'Carta-recomendacion.png': 'certificates/carta-recomendacion-pymetech.webp',
    'CARTA DE RECOMENDACION PERSONAL.png': 'certificates/carta-recomendacion-tics.webp',
    
    // UI Icons
    'modo-oscuro.png': 'icons/theme-dark.svg',
    'modo-claro.png': 'icons/theme-light.svg',
    'traductor (1).png': 'icons/lang-es.svg',
    'traductor.png': 'icons/lang-en.svg',
    'github.png': 'icons/github.svg',
    'linkedin.png': 'icons/linkedin.svg',
    'facebook.png': 'icons/facebook.svg',
    'whatsapp.png': 'icons/whatsapp.svg',
    'flecha-arriba.png': 'icons/scroll-top.svg',
};


async function optimizeImages(inputPath, outputPath, options = {}) {
    const { widths = CONFIG.widths, ...sharpOptions} = options;

    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    for (const width of widths) {
        if (metadata.width && metadata.width >= width) {
            const webpPath = outputPath.replace('.webp', `-${width}w.webp`);
            await image.clone().resize(width, null, {
                widthoutEnlargement: true
            }).webp(CONFIG.webp).toFile(webpPath);
        }
    }

    await image.clone().webp(CONFIG.webp).toFile(outputPath);

    const avifPath = outputPath.replace('.webp', '.avif');
    await image.clone().avif(CONFIG.avif).toFile(avifPath);

    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
}

async function generateThumbnails() {
    for (const cert of [ 'github-course', 'python-santander', 'diploma-terminacion',
    'carta-pasante', 'ia-big-school', 'carta-recomendacion-pymetech',
    'carta-recomendacion-tics']) {
        const src = path.join(OUTPUT_DIR, 'certificates', `${cert}.webp`);
        const thumb = path.join(OUTPUT_DIR, 'certificates', `${cert}-thumb.webp`);

        try {
            await sharp(src).resize(CONFIG.thumbnail.width, CONFIG.thumbnail.height, {
                fit: CONFIG.thumbnail.fit, 
                position: 'center'
            }).webp({ quality: 80 }).toFile(thumb);
              console.log(`🖼️ Thumbnail: ${cert}-thumb.webp`);
        } catch (e) {
        console.warn(`⚠️ No thumbnail for ${cert}:`, e.message);
        }
    }
}

async function main() {
    console.log('🚀 Iniciando optimizacion de assets...\n');
    try {
        await fs.access(INPUT_DIR);
    } catch (ex) {
        console.error(`❌ No existe: ${INPUT_DIR}`);
        console.log('Ajusta INPUT_DIR en el script');
        process.exit(1);
    }
    for (const [srcName, destPath] of Object.entries(FILE_MAP)) {
        const inputPath = path.join(INPUT_DIR, srcName);
        const outputPath = path.join(OUTPUT_DIR, destPath);

        try {
            await fs.access(inputPath);
            await optimizeImages(inputPath, outputPath);
        } catch (ex) {
            console.warn(`⚠️ No encontrado: ${srcName}`);
        }
    }
    console.log('\n📸 Generando thumbnails...');
    await generateThumbnails();

    console.log('\n✨ ¡Optimización completada!');
    console.log(`📁 Assets en: ${OUTPUT_DIR}`);
}

main().catch(console.error);