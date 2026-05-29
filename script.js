// ANIMACIÓN DE ENTRADA (2 segundos, sin click)
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 2000);
});

// PANEL DE AJUSTES
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('open');
    
    let overlay = document.querySelector('.settings-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'settings-overlay';
        overlay.onclick = toggleSettings;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('show');
}

// TEMA CLARO/OSCURO
function setTheme(theme) {
    const body = document.body;
    const btnDark = document.getElementById('btnDark');
    const btnLight = document.getElementById('btnLight');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// TAMAÑO DE LETRA
function setFontSize(size) {
    const body = document.body;
    const btnSmall = document.getElementById('btnSmall');
    const btnNormal = document.getElementById('btnNormal');
    const btnLarge = document.getElementById('btnLarge');
    
    body.classList.remove('font-small', 'font-normal', 'font-large');
    btnSmall.classList.remove('active');
    btnNormal.classList.remove('active');
    btnLarge.classList.remove('active');
    
    if (size === 'small') {
        body.classList.add('font-small');
        btnSmall.classList.add('active');
        localStorage.setItem('fontSize', 'small');
    } else if (size === 'large') {
        body.classList.add('font-large');
        btnLarge.classList.add('active');
        localStorage.setItem('fontSize', 'large');
    } else {
        body.classList.add('font-normal');
        btnNormal.classList.add('active');
        localStorage.setItem('fontSize', 'normal');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    setFontSize(savedFontSize);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .info-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Menú responsive
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        if (navbar) navbar.style.transform = 'translateY(-100%)';
    } else {
        if (navbar) navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// GALERÍA: Control de flechas y scroll
// ============================================
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryGrid = document.getElementById('galleryGrid');
const galleryItems = document.querySelectorAll('.gallery-item');

function updateArrowsVisibility() {
    if (!prevBtn || !nextBtn || !galleryGrid) return;
    
    const isMobile = window.innerWidth <= 768;
    const itemCount = galleryItems.length;
    
    // En PC, solo mostrar flechas si hay más de 4 imágenes
    if (!isMobile) {
        if (itemCount > 4) {
            prevBtn.classList.remove('hidden-btn');
            nextBtn.classList.remove('hidden-btn');
        } else {
            prevBtn.classList.add('hidden-btn');
            nextBtn.classList.add('hidden-btn');
        }
    } else {
        // En móvil, siempre mostrar flechas
        prevBtn.classList.remove('hidden-btn');
        nextBtn.classList.remove('hidden-btn');
    }
}

function setupMobileSlider() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && galleryGrid) {
        // Configurar scroll con flechas
        const scrollAmount = 280;
        
        const scrollLeftHandler = () => {
            galleryGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };
        
        const scrollRightHandler = () => {
            galleryGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        };
        
        // Remover listeners anteriores y agregar nuevos
        prevBtn.removeEventListener('click', scrollLeftHandler);
        nextBtn.removeEventListener('click', scrollRightHandler);
        
        prevBtn.addEventListener('click', scrollLeftHandler);
        nextBtn.addEventListener('click', scrollRightHandler);
    }
}

// Inicializar
updateArrowsVisibility();
setupMobileSlider();

// Actualizar al redimensionar
window.addEventListener('resize', () => {
    updateArrowsVisibility();
    setupMobileSlider();
});

// También observar cambios en el DOM
const observerGrid = new ResizeObserver(() => {
    updateArrowsVisibility();
});
if (galleryGrid) {
    observerGrid.observe(galleryGrid);
}